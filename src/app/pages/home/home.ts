import {
  Component, ViewChild, ElementRef, AfterViewInit, inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home implements AfterViewInit {
  @ViewChild('nameElement') nameElement!: ElementRef;
  @ViewChild('heroContainer') heroContainer!: ElementRef;
  platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.nameElement) {
        this.nameElement.nativeElement.textContent = 'Soy Felipe Agudelo';
      }
    }
  }

  private getNavbarOffsetForTarget(targetY: number): number {
    const el = document.querySelector('.custom-navbar') as HTMLElement | null;
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
    while (cur) { top += cur.offsetTop; cur = cur.offsetParent as HTMLElement | null; }
    return top;
  }

  scrollToSection(sectionId: string): void {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    const rawTop  = this.getAbsoluteTop(el);
    const targetY = Math.max(0, Math.round(rawTop - this.getNavbarOffsetForTarget(rawTop)));
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }
}
