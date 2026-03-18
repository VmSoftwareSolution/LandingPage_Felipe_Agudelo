import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private host       = inject(ElementRef<HTMLElement>);

  private scrollListener: (() => void) | null = null;
  menuOpen      = false;
  activeSection = 'inicio';
  scrolled      = false;

  navLinks = [
    { section: 'inicio',      label: 'Inicio' },
    { section: 'sobre',       label: 'Sobre mí' },
    { section: 'tecnologias', label: 'Tecnologías' },
    { section: 'proyecto',    label: 'Proyecto' },
    { section: 'testimonios', label: 'Testimonios' },
    { section: 'contacto',    label: 'Contacto' }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('keydown', this.handleEscape);
      this.scrollListener = this.onScroll.bind(this);
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      window.addEventListener('resize', this.scrollListener, { passive: true });
      requestAnimationFrame(() => this.updateActiveSection());
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('keydown', this.handleEscape);
      if (this.scrollListener) {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
      }
      document.body.style.overflow = 'auto';
    }
  }

  private getNavbarOffset(): number {
    const el = this.host.nativeElement.querySelector('.custom-navbar') as HTMLElement | null;
    if (!el) return 0;
    const marginTop = parseFloat(getComputedStyle(el).marginTop) || 0;
    return marginTop + el.offsetHeight;
  }

  private getNavbarOffsetForTarget(targetY: number): number {
    const el = this.host.nativeElement.querySelector('.custom-navbar') as HTMLElement | null;
    if (!el) return 0;
    const SCROLLED_THRESHOLD = 150;
    if (targetY > SCROLLED_THRESHOLD) {
      return 40;
    }
    const marginTop = parseFloat(getComputedStyle(el).marginTop) || 0;
    return marginTop + el.offsetHeight;
  }

  private getAbsoluteTop(el: HTMLElement): number {
    let top = 0;
    let cur: HTMLElement | null = el;
    while (cur) {
      top += cur.offsetTop;
      cur = cur.offsetParent as HTMLElement | null;
    }
    return top;
  }

  private updateActiveSection(): void {
    const scrollTop = window.scrollY;
    const offset    = this.getNavbarOffset();
    const TOLERANCE = 4;
    let   found     = this.navLinks[0].section;

    for (const link of this.navLinks) {
      const el = document.getElementById(link.section);
      if (!el) continue;
      if (scrollTop >= this.getAbsoluteTop(el) - offset - TOLERANCE) {
        found = link.section;
      }
    }
    this.activeSection = found;
  }

  private onScroll(): void {
    if (typeof window === 'undefined') return;
    const isDesktop = window.innerWidth > 991;
    if (!isDesktop) {
      this.scrolled = false;
    } else {
      this.scrolled = window.scrollY > 150;
      if (this.scrolled && this.menuOpen) this.closeMenu();
    }
    this.updateActiveSection();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow =
      this.menuOpen && window.innerWidth <= 991 ? 'hidden' : 'auto';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }

  private handleClickOutside = (event: Event): void => {
    const navbar = this.host.nativeElement.querySelector('.custom-navbar');
    if (this.menuOpen && navbar && !navbar.contains(event.target as Node)) {
      this.closeMenu();
    }
  };

  private handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.menuOpen) this.closeMenu();
  };

  scrollTo(event: Event, sectionId: string): void {
    event?.preventDefault?.();
    if (typeof window === 'undefined') return;
    this.activeSection = sectionId;
    this.closeMenu();
    const el = document.getElementById(sectionId);
    if (!el) return;
    const rawTop  = this.getAbsoluteTop(el);
    const targetY = Math.max(0, Math.round(rawTop - this.getNavbarOffsetForTarget(rawTop)));
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}
