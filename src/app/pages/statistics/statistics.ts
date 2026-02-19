import { Component, AfterViewInit, ViewChild, ElementRef, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class Statistics implements AfterViewInit, OnDestroy {

  @ViewChild('statsSection') statsSectionRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;
  private hasPlayed = false;

  /**
   * - current: 0   → anima subiendo al value máximo y luego baja de regreso a 0
   * - current: N   → anima subiendo de 0 hasta N y se queda fijo en N
   *
   * Ejemplo: mostrar 10 proyectos en curso fijos al llegar:
   * { label: 'Proyectos en Curso', value: 5, current: 10, icon: 'fa fa-tasks' }
   */
  counters = [
    { label: 'Proyectos Realizados', value: 110,   current: 0, icon: 'fa fa-briefcase' },
    { label: 'Proyectos en Curso',   value: 5,     current: 0, icon: 'fa fa-tasks'     },
    { label: 'Líneas de Código',     value: 25000, current: 0, icon: 'fa fa-code'      },
    { label: 'Tazas de Café',        value: 1500,  current: 0, icon: 'fa fa-coffee'    },
    { label: 'Horas de Insomnio',    value: 300,   current: 0, icon: 'fa fa-moon'      }
  ];

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasPlayed) {
            this.hasPlayed = true;
            this.observer.disconnect();
            this.animateCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      if (this.statsSectionRef?.nativeElement) {
        this.observer.observe(this.statsSectionRef.nativeElement);
      }
    }, 100);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private animateCounters() {
    const duration = 2000;

    this.counters.forEach(counter => {
      const finalValue = counter.current;
      const peak       = counter.value;

      counter.current  = 0;

      if (finalValue === 0) {
        let start = 0;
        const increment = peak / (duration / 16);

        const stepUp = () => {
          start += increment;
          if (start < peak) {
            counter.current = Math.floor(start);
            requestAnimationFrame(stepUp);
          } else {
            counter.current = peak;

            let current = peak;
            const decrement = peak / (600 / 16);

            const stepDown = () => {
              current -= decrement;
              if (current > 0) {
                counter.current = Math.floor(current);
                requestAnimationFrame(stepDown);
              } else {
                counter.current = 0;
              }
            };

            requestAnimationFrame(stepDown);
          }
        };

        requestAnimationFrame(stepUp);

      } else {
        let start = 0;
        const increment = finalValue / (duration / 16);

        const stepUp = () => {
          start += increment;
          if (start < finalValue) {
            counter.current = Math.floor(start);
            requestAnimationFrame(stepUp);
          } else {
            counter.current = finalValue;
          }
        };

        requestAnimationFrame(stepUp);
      }
    });
  }
}
