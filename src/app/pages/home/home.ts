import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  PLATFORM_ID
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
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
