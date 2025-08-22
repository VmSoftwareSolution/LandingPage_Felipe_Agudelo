import { Component, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class Statistics implements AfterViewInit {
  counters = [
    { label: 'Proyectos Realizados', value: 110, current: 0, icon: 'fa fa-briefcase' },
    { label: 'Proyectos en Curso', value: 5, current: 0, icon: 'fa fa-tasks' },
    { label: 'Líneas de Código', value: 25000, current: 0, icon: 'fa fa-code' },
    { label: 'Tazas de Café', value: 1500, current: 0, icon: 'fa fa-coffee' },
    { label: 'Horas de Insomnio', value: 300, current: 0, icon: 'fa fa-moon' }
  ];

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // ejecuta animación sin necesidad de interacción
      setTimeout(() => this.animateCounters(), 0);
    }
  }

private animateCounters() {
  this.counters.forEach(counter => {
    let start = 0;
    const duration = 2000;
    const increment = counter.value / (duration / 16); // ~60fps

    const step = () => {
      start += increment;
      if (start < counter.value) {
        counter.current = Math.floor(start);
        requestAnimationFrame(step);
      } else {
        counter.current = counter.value;
      }
    };

    requestAnimationFrame(step);
  });
}


}
