import {
  Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll',
  imports: [],
  templateUrl: './scroll.html',
  styleUrl: './scroll.css'
})
export class Scroll implements OnInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);

  private readonly sectionIds = [
    'inicio',
    'sobre',
    'tecnologias',
    'proyecto',
    'testimonios',
    'contacto'
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.updateScrollProgress());
    }
  }

  ngOnDestroy() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollProgress();
  }

  private getNavbarOffset(): number {
    const el = document.querySelector('.custom-navbar') as HTMLElement | null;
    if (!el) return 0;
    const marginTop = parseFloat(getComputedStyle(el).marginTop) || 0;
    return marginTop + el.offsetHeight;
  }

  private getNavbarOffsetForTarget(targetY: number): number {
    const el = document.querySelector('.custom-navbar') as HTMLElement | null;
    if (!el) return 0;
    if (targetY > 150) return 40;
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

  public scrollToNextSection(): void {
    const scrollTop = window.scrollY;
    const TOLERANCE = 4;

    let currentIndex = 0;

    for (let i = 0; i < this.sectionIds.length; i++) {
      const el = document.getElementById(this.sectionIds[i]);
      if (!el) continue;
      const sectionTop = this.getAbsoluteTop(el);
      if (scrollTop >= sectionTop - this.getNavbarOffset() - TOLERANCE) {
        currentIndex = i;
      }
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= this.sectionIds.length) return;

    const nextEl = document.getElementById(this.sectionIds[nextIndex]);
    if (!nextEl) return;

    const rawTop  = this.getAbsoluteTop(nextEl);
    const targetY = Math.max(0, Math.round(rawTop - this.getNavbarOffsetForTarget(rawTop)));

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  private updateScrollProgress(): void {
    const docEl       = document.documentElement;
    const scrollTop   = window.pageYOffset || docEl.scrollTop;

    // El máximo se calcula hasta el top de #contacto (última sección),
    // no hasta el final del documento — así el círculo llega al 100%
    // exactamente al llegar a contacto, sin contar el footer.
    const lastId  = this.sectionIds[this.sectionIds.length - 1];
    const lastEl  = document.getElementById(lastId) as HTMLElement | null;
    const maxScroll = lastEl
      ? this.getAbsoluteTop(lastEl) - this.getNavbarOffset()
      : docEl.scrollHeight - docEl.clientHeight;

    if (maxScroll <= 0) return;

    const progress      = Math.min(scrollTop / maxScroll, 1);
    const circumference = 2 * Math.PI * 33;
    const offset        = circumference * (1 - progress);

    const circle = document.querySelector('.progress-ring-circle') as SVGCircleElement | null;
    if (circle) circle.style.strokeDashoffset = String(offset);
  }
}
