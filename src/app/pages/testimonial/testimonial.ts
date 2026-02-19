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

  get pairs(): { first: any, second: any }[] {
    const result = [];
    for (let i = 0; i < this.references.length; i += 2) {
      result.push({
        first:  this.references[i],
        second: this.references[i + 1] ?? this.references[0]
      });
    }
    return result;
  }

  get activePairIndex(): number {
    return Math.floor(this.currentIndex / 2);
  }


  ngAfterViewInit() {
    this.boundMouseMove = (e) => this.onDrag(e);
    this.boundMouseUp   = (e) => this.endDrag(e);

    this.scrollToPair(this.activePairIndex, false);

    this.resizeObs = new ResizeObserver(() => {
      this.scrollToPair(this.activePairIndex, false);
    });
    this.resizeObs.observe(this.trackRef.nativeElement);
  }

  ngOnDestroy() {
    this.removeDocumentListeners();
    this.resizeObs?.disconnect();
  }


  private getTrack(): HTMLElement {
    return this.trackRef.nativeElement;
  }

  private getPageWidth(): number {
    return this.getTrack().parentElement?.offsetWidth ?? 0;
  }

  private scrollToPair(pairIndex: number, smooth: boolean) {
    const track  = this.getTrack();
    const pageW  = this.getPageWidth();
    const target = pairIndex * pageW;

    if (smooth) {
      track.scrollTo({ left: target, behavior: 'smooth' });
    } else {
      track.scrollLeft = target;
    }
  }


  nextSlide() {
    if (this.isSnapping) return;
    this.isSnapping = true;

    const nextPair = (this.activePairIndex + 1) % this.pairs.length;
    this.currentIndex = nextPair * 2;
    this.scrollToPair(nextPair, true);

    setTimeout(() => { this.isSnapping = false; }, 600);
  }

  previousSlide() {
    if (this.isSnapping) return;
    this.isSnapping = true;

    const prevPair = (this.activePairIndex - 1 + this.pairs.length) % this.pairs.length;
    this.currentIndex = prevPair * 2;
    this.scrollToPair(prevPair, true);

    setTimeout(() => { this.isSnapping = false; }, 600);
  }


  startDrag(event: MouseEvent) {
    if (this.isSnapping) return;
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
      this.scrollToPair(this.activePairIndex, true);
      setTimeout(() => { this.isSnapping = false; }, 600);
    }
  }

  private removeDocumentListeners() {
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup',   this.boundMouseUp);
  }


  startTouchDrag(event: TouchEvent) {
    if (this.isSnapping) return;
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
      this.scrollToPair(this.activePairIndex, true);
      setTimeout(() => { this.isSnapping = false; }, 600);
    }
  }
}
