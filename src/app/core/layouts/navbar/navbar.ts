import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, PLATFORM_ID, ElementRef, Renderer2 } from '@angular/core';
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
  private host = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  private scrollListener: (() => void) | null = null;
  menuOpen = false;
  activeSection = 'inicio';
  scrolled = false;

  navLinks = [
    { section: 'inicio', label: 'Inicio' },
    { section: 'sobre', label: 'Sobre mí' },
    { section: 'proyecto', label: 'Proyecto' },
    { section: 'blog', label: 'Blog' },
    { section: 'testimonios', label: 'Testimonios' }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('keydown', this.handleEscape);
      this.scrollListener = this.onScroll.bind(this);
      window.addEventListener('scroll', this.scrollListener, { passive: true });
      window.addEventListener('resize', this.onScroll.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('keydown', this.handleEscape);
      if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
      document.body.style.overflow = 'auto';
    }
  }

  private onScroll(): void {
    if (typeof window === 'undefined') return;
    const isDesktop = window.innerWidth > 991;
    if (!isDesktop) {
      this.scrolled = false;
      return;
    }

    const threshold = 150;
    const y = window.scrollY || window.pageYOffset;
    this.scrolled = y > threshold;

    if (this.scrolled && this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen && window.innerWidth <= 991 ? 'hidden' : 'auto';
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }

  private handleClickOutside = (event: Event): void => {
    const navbar = this.host.nativeElement.querySelector('.custom-navbar');
    const target = event.target as HTMLElement;

    if (this.menuOpen && navbar && !navbar.contains(target)) {
      this.closeMenu();
    }
  };

  private handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.menuOpen) {
      this.closeMenu();
    }
  };

  scrollTo(sectionId: string): void {
    this.setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
