import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('nameElement') nameElement!: ElementRef;
  @ViewChild('profileImage') profileImage!: ElementRef;
  @ViewChild('aboutTitle') aboutTitle!: ElementRef;
  @ViewChild('aboutParagraph') aboutParagraph!: ElementRef;
  @ViewChild('aboutParagraph2') aboutParagraph2!: ElementRef;
  @ViewChild('aboutParagraph3') aboutParagraph3!: ElementRef;
  @ViewChild('aboutParagraph4') aboutParagraph4!: ElementRef;
  @ViewChild('heroContainer') heroContainer!: ElementRef;

  private observer!: IntersectionObserver;
  private resizeListener!: () => void;
  private currentBreakpoint: string = 'desktop';

  constructor() {}

  ngOnInit(): void {
    this.setupIntersectionObserver();
    this.setupResizeListener();
    this.detectBreakpoint();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.typeWriter();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private detectBreakpoint(): void {
    const width = window.innerWidth;
    let newBreakpoint: string;

    if (width >= 992) {
      newBreakpoint = 'desktop';
    } else if (width >= 768) {
      newBreakpoint = 'tablet';
    } else {
      newBreakpoint = 'mobile';
    }

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      this.applyBreakpointAnimations();
    }
  }

  private applyBreakpointAnimations(): void {
    if (!this.heroContainer) return;

    const heroElement = this.heroContainer.nativeElement;

    heroElement.classList.remove('hero-desktop', 'hero-tablet', 'hero-mobile');

    setTimeout(() => {
      heroElement.classList.add(`hero-${this.currentBreakpoint}`);
    }, 50);
  }

  private setupResizeListener(): void {
    this.resizeListener = () => {
      this.detectBreakpoint();
    };

    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  private typeWriter(): void {
    if (!this.nameElement) return;

    const originalText = this.nameElement.nativeElement.textContent;
    this.nameElement.nativeElement.textContent = '';
    let i = 0;

    const type = () => {
      if (i < originalText.length) {
        this.nameElement.nativeElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    };

    setTimeout(type, 1000);
  }

  private setupIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  }

  private observeElements(): void {
    if (this.observer) {
      const elementsToObserve = [
        this.aboutTitle?.nativeElement,
        this.aboutParagraph?.nativeElement,
        this.aboutParagraph2?.nativeElement,
        this.aboutParagraph3?.nativeElement,
        this.aboutParagraph4?.nativeElement
      ].filter(el => el);

      elementsToObserve.forEach(element => {
        if (element) {
          this.observer.observe(element);
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.aboutTitle?.nativeElement && !this.aboutTitle.nativeElement.hasAttribute('data-observed')) {
      this.observeElements();

      [this.aboutTitle, this.aboutParagraph, this.aboutParagraph2, this.aboutParagraph3, this.aboutParagraph4]
        .filter(el => el?.nativeElement)
        .forEach(el => el!.nativeElement.setAttribute('data-observed', 'true'));
    }
  }

  onContactClick(): void {
    this.scrollToSection('contact');
  }
}
