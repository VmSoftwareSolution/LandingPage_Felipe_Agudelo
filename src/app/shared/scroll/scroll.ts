import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll',
  imports: [],
  templateUrl: './scroll.html',
  styleUrl: './scroll.css'
})
export class Scroll implements OnInit {

  private sections = [
    'inicio',
    'sobre',
    'tecnologias',
    'proyecto',
    'testimonios',
    'contacto'
  ];

  ngOnInit() {
    this.updateScrollProgress();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollProgress();
  }

  public scrollToNextSection(): void {
    const currentScroll = window.scrollY;
    const navbarHeight = document.querySelector('.custom-navbar')?.clientHeight || 0;

    // Encontrar la sección actual
    let currentIndex = -1;

    for (let i = 0; i < this.sections.length; i++) {
      const element = document.getElementById(this.sections[i]);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      // Si estamos en esta sección o más arriba
      if (currentScroll >= sectionTop - navbarHeight - 100) {
        currentIndex = i;
      }
    }

    // Ir a la siguiente sección
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.sections.length) {
      const nextSection = document.getElementById(this.sections[nextIndex]);

      if (nextSection) {
        const rect = nextSection.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - navbarHeight - 10;

        window.scrollTo({
          top: Math.max(0, Math.round(targetY)),
          behavior: 'smooth'
        });
      }
    }
  }

  private updateScrollProgress(): void {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];

    if (sections.length <= 1) return;

    const sectionsToCount = sections.slice(0, -1);
    const lastSection = sectionsToCount[sectionsToCount.length - 1];

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScrollHeight = lastSection.offsetTop + lastSection.offsetHeight;
    const scrollProgress = Math.min(scrollTop / maxScrollHeight, 1);

    const circumference = 2 * Math.PI * 33;
    const offset = circumference - (scrollProgress * circumference);

    const circle = document.querySelector('.progress-ring-circle') as SVGCircleElement;
    if (circle) {
      circle.style.strokeDashoffset = offset.toString();
    }
  }

}
