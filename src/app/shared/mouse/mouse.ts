import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mouse',
  standalone: true,
  templateUrl: './mouse.html',
  styleUrl: './mouse.css',
  imports: []
})
export class Mouse implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private mouseX = 0;
  private mouseY = 0;
  private animationFrameId: number | null = null;

  ngOnInit() {
    this.updateCursorPosition();
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private updateCursorPosition() {
    const dot = this.el.nativeElement.querySelector('.cursor-inner');
    const ring = this.el.nativeElement.querySelector('.cursor-outer');

    if (dot && ring) {
      this.renderer.setStyle(dot, 'transform', `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`);
      this.renderer.setStyle(ring, 'transform', `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`);
    }

    this.animationFrameId = requestAnimationFrame(() => this.updateCursorPosition());
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(e: MouseEvent) {
    const ring = this.el.nativeElement.querySelector('.cursor-outer');
    const target = e.target as HTMLElement;

    if (target.closest('a, button, input, textarea, [role="button"]')) {
      this.renderer.addClass(ring, 'cursor-hover');
    } else {
      this.renderer.removeClass(ring, 'cursor-hover');
    }
  }
}
