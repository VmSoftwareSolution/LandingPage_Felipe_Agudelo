import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  imports: [CommonModule],
  templateUrl: './testimonial.html',
  styleUrl: './testimonial.css'
})
export class Testimonial {
  @ViewChild('carousel') carouselRef!: ElementRef;

  isDragging = false;
  startX = 0;
  scrollLeft = 0;

  references = [
    {
      name: 'Tim Cook',
      role: 'CEO, Apple',
      comment: 'Qui apam temporibus quisquam vel! Maiores eos cumque distinctio nam accusantium ipsum. Laudantium quis consequatur molestias dolentus culpa facere hic dolores aperiam. Accusantium quos qui praesentium corporis.',
      image: '/user-01.jpg'
    },
    {
      name: 'Sundar Pichai',
      role: 'CEO, Google',
      comment: 'Excepturi nam cupiditate culpa dolorem que dolentis repellat. Veniam quos repellar voluptas animi adipisci. Nisi eaque consequatur. Quasi voluptas eius distinctio. Atque eos maxime. Qui ipsam temporibus quisquam vel.',
      image: '/user-01.jpg'
    },
    {
      name: 'Elon Musk',
      role: 'CEO, Tesla & SpaceX',
      comment: 'Outstanding work ethic and innovative thinking. The level of dedication and creativity shown is truly remarkable. Highly recommend for any challenging project.',
      image: '/user-01.jpg'
    },
    {
      name: 'Satya Nadella',
      role: 'CEO, Microsoft',
      comment: 'Exceptional leadership and technical expertise. The ability to transform complex problems into elegant solutions is impressive. A true professional in every sense.',
      image: '/user-02.jpg'
    },
    {
      name: 'Elon Musk',
      role: 'CEO, Tesla & SpaceX',
      comment: 'Outstanding work ethic and innovative thinking. The level of dedication and creativity shown is truly remarkable. Highly recommend for any challenging project.',
      image: '/user-02.jpg'
    },
    {
      name: 'Elon Musk',
      role: 'CEO, Tesla & SpaceX',
      comment: 'Outstanding work ethic and innovative thinking. The level of dedication and creativity shown is truly remarkable. Highly recommend for any challenging project.',
      image: '/user-02.jpg'
    }
  ];

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.pageX - this.carouselRef.nativeElement.offsetLeft;
    this.scrollLeft = this.carouselRef.nativeElement.scrollLeft;
  }

  endDrag() {
    this.isDragging = false;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.carouselRef.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5; // velocidad
    this.carouselRef.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  previousSlide() {
    const carousel = this.carouselRef.nativeElement;
    const cardWidth = carousel.querySelector('.reference-card')?.offsetWidth || 0;
    carousel.scrollBy({
      left: -(cardWidth + 32), 
      behavior: 'smooth'
    });
  }

  nextSlide() {
    const carousel = this.carouselRef.nativeElement;
    const cardWidth = carousel.querySelector('.reference-card')?.offsetWidth || 0;
    carousel.scrollBy({
      left: cardWidth + 32,
      behavior: 'smooth'
    });
  }
}