import { Component, HostListener, inject } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mouse',
  standalone: true,
  templateUrl: './mouse.html',
  styleUrl: './mouse.css',
  imports: []
})
export class Mouse {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const dot = this.el.nativeElement.querySelector('.cursor-inner');
    const ring = this.el.nativeElement.querySelector('.cursor-outer');

    this.renderer.setStyle(dot, 'transform', `translate3d(${x}px, ${y}px, 0)`);
    this.renderer.setStyle(ring, 'transform', `translate3d(${x}px, ${y}px, 0)`);
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
