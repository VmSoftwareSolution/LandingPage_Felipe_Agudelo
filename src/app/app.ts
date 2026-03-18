import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Navbar } from './core/layouts/navbar/navbar';
import { Mouse } from './shared/mouse/mouse';
import { Footer } from './core/layouts/footer/footer';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Mouse, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App implements OnInit {
  protected title = 'landingPage';
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        once: true,           // animación solo ocurre una vez
        offset: 60,           // dispara 60px antes del elemento
        duration: 800,
        easing: 'ease-out-cubic',
        // CLAVE: evita que AOS expanda el documento al aplicar
        // transforms a elementos fuera del viewport en el primer render
        startEvent: 'DOMContentLoaded',
        disableMutationObserver: false,
      });
    }
  }
}
