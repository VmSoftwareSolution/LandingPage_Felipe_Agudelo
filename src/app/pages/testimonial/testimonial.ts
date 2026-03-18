import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.html',
  styleUrls: ['./testimonial.css']
})
export class Testimonial implements AfterViewInit, OnDestroy {

  @ViewChild('track') trackRef!: ElementRef<HTMLElement>;

  currentIndex = 0;
  isDragging   = false;

  private dragStartX  = 0;
  private scrollStart = 0;
  private hasMoved    = false;
  private isSnapping  = false;
  private resizeObs!: ResizeObserver;
  private autoPlayTimer: any = null;
  private userInteracted = false;
  private userInteractTimeout: any = null;

  private boundMouseMove!: (e: MouseEvent) => void;
  private boundMouseUp!:   (e: MouseEvent) => void;

  references = [
    {
      name: 'Tim Cook',
      role: 'CEO, Apple',
      comment: 'Qui ipsam temporibus quisquam vel! Maiores eos cumque distinctio nam accusantium ipsum. Laudantium quis consequatur molestias delectus culpa facere hic dolores aperiam. Accusantium quos qui praesentium corporis.',
      image: '/user-01.jpg'
    },
    {
      name: 'Sundar Pichai',
      role: 'CEO, Google',
      comment: 'Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.',
      image: '/user-02.jpg'
    },
    {
      name: 'Elon Musk',
      role: 'CEO, Tesla & SpaceX',
      comment: 'Outstanding work ethic and innovative thinking. The level of dedication and creativity shown is truly remarkable. Highly recommend for any challenging project that requires vision.',
      image: '/user-01.jpg'
    },
    {
      name: 'Satya Nadella',
      role: 'CEO, Microsoft',
      comment: 'Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam. Autem eaque officia cum exercitationem sunt voluptatum accusamus.',
      image: '/user-02.jpg'
    }
  ];

  // En móvil (<768px) mostramos 1 por página, en desktop 2 por página
  private get isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  // Páginas: en móvil cada referencia es su propia página
  get pages(): any[][] {
    if (this.isMobile) {
      return this.references.map(r => [r]);
    }
    const result: any[][] = [];
    for (let i = 0; i < this.references.length; i += 2) {
      result.push([this.references[i], this.references[i + 1] ?? this.references[0]]);
    }
    return result;
  }

  // Mantener pairs para compatibilidad con el HTML existente
  get pairs(): { first: any, second: any }[] {
    return this.pages.map(p => ({ first: p[0], second: p[1] ?? null }));
  }

  get activePairIndex(): number {
    return this.currentIndex;
  }

  ngAfterViewInit() {
    this.boundMouseMove = (e) => this.onDrag(e);
    this.boundMouseUp   = (e) => this.endDrag(e);

    this.scrollToPair(this.currentIndex, false);

    this.resizeObs = new ResizeObserver(() => {
      this.scrollToPair(this.currentIndex, false);
    });
    this.resizeObs.observe(this.trackRef.nativeElement);

    // Auto-play: avanza cada 4 segundos si el usuario no interactúa
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.removeDocumentListeners();
    this.resizeObs?.disconnect();
    this.stopAutoPlay();
    clearTimeout(this.userInteractTimeout);
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.userInteracted && !this.isSnapping) {
        this.nextSlide();
      }
    }, 4000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  // Pausa el auto-play 8 segundos tras interacción del usuario, luego lo reanuda
  private onUserInteract(): void {
    this.userInteracted = true;
    clearTimeout(this.userInteractTimeout);
    this.userInteractTimeout = setTimeout(() => {
      this.userInteracted = false;
    }, 8000);
  }

  private getTrack(): HTMLElement {
    return this.trackRef.nativeElement;
  }

  private getPageWidth(): number {
    return this.getTrack().parentElement?.offsetWidth ?? 0;
  }

  private scrollToPair(pageIndex: number, smooth: boolean) {
    const track  = this.getTrack();
    const pageW  = this.getPageWidth();
    const target = pageIndex * pageW;

    if (smooth) {
      track.scrollTo({ left: target, behavior: 'smooth' });
    } else {
      track.scrollLeft = target;
    }
  }

  nextSlide() {
    if (this.isSnapping) return;
    this.isSnapping = true;

    const next = (this.currentIndex + 1) % this.pages.length;
    this.currentIndex = next;
    this.scrollToPair(next, true);

    setTimeout(() => { this.isSnapping = false; }, 600);
  }

  previousSlide() {
    if (this.isSnapping) return;
    this.isSnapping = true;

    const prev = (this.currentIndex - 1 + this.pages.length) % this.pages.length;
    this.currentIndex = prev;
    this.scrollToPair(prev, true);

    setTimeout(() => { this.isSnapping = false; }, 600);
  }

  startDrag(event: MouseEvent) {
    if (this.isSnapping) return;
    this.onUserInteract();
    this.isDragging  = true;
    this.hasMoved    = false;
    this.dragStartX  = event.clientX;
    this.scrollStart = this.getTrack().scrollLeft;
    event.preventDefault();

    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mouseup',   this.boundMouseUp);
  }

  private onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const delta = this.dragStartX - event.clientX;
    if (Math.abs(delta) > 5) this.hasMoved = true;
    if (!this.hasMoved) return;
    this.getTrack().scrollLeft = this.scrollStart + delta;
  }

  private endDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.removeDocumentListeners();

    if (!this.hasMoved) return;
    const delta     = this.dragStartX - event.clientX;
    const threshold = this.getPageWidth() * 0.2;

    if (delta > threshold) {
      this.nextSlide();
    } else if (delta < -threshold) {
      this.previousSlide();
    } else {
      this.isSnapping = true;
      this.scrollToPair(this.currentIndex, true);
      setTimeout(() => { this.isSnapping = false; }, 600);
    }
  }

  private removeDocumentListeners() {
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup',   this.boundMouseUp);
  }

  startTouchDrag(event: TouchEvent) {
    if (this.isSnapping) return;
    this.onUserInteract();
    this.isDragging  = true;
    this.hasMoved    = false;
    this.dragStartX  = event.touches[0].clientX;
    this.scrollStart = this.getTrack().scrollLeft;
  }

  onTouchDrag(event: TouchEvent) {
    if (!this.isDragging) return;
    const delta = this.dragStartX - event.touches[0].clientX;
    if (Math.abs(delta) > 5) this.hasMoved = true;
    if (!this.hasMoved) return;
    this.getTrack().scrollLeft = this.scrollStart + delta;
  }

  endTouchDrag(event: TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (!this.hasMoved) return;

    const delta     = this.dragStartX - event.changedTouches[0].clientX;
    const threshold = this.getPageWidth() * 0.2;

    if (delta > threshold) {
      this.nextSlide();
    } else if (delta < -threshold) {
      this.previousSlide();
    } else {
      this.isSnapping = true;
      this.scrollToPair(this.currentIndex, true);
      setTimeout(() => { this.isSnapping = false; }, 600);
    }
  }

  // Pausa el auto-play cuando el usuario usa las flechas manualmente
  onNavClick(direction: 'next' | 'prev'): void {
    this.onUserInteract();
    direction === 'next' ? this.nextSlide() : this.previousSlide();
  }
}
