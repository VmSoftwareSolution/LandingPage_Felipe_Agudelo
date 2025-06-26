import { Component } from '@angular/core';

@Component({
  selector: 'app-scroll',
  imports: [],
  templateUrl: './scroll.html',
  styleUrl: './scroll.css'
})
export class Scroll {

  public scrollToNextSection(): void {
    const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    const currentScroll = window.scrollY;
    window.innerHeight;

    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      if (sectionTop > currentScroll + 10) {
        section.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

}
