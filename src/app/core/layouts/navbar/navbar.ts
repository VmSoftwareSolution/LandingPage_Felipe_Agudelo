import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  menuOpen = false;
  activeSection = 'inicio';

  navLinks = [
    { section: 'inicio', label: 'Inicio' },
    { section: 'sobre', label: 'Sobre Mi' },
    { section: 'proyecto', label: 'Proyecto' },
    { section: 'blog', label: 'Blog' },
    { section: 'testimonios', label: 'Testimonios' }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.handleClickOutside);
      document.addEventListener('keydown', this.handleEscape);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleClickOutside);
      document.removeEventListener('keydown', this.handleEscape);
      document.body.style.overflow = 'auto';
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen && window.innerWidth <= 991 ? 'hidden' : 'auto';
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = 'auto';
  }

  private handleClickOutside = (event: Event): void => {
    const navbar = document.querySelector('.custom-navbar');
    const target = event.target as HTMLElement;

    if (this.menuOpen && navbar && !navbar.contains(target)) {
      this.closeMenu();
    }
  };

  private handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.menuOpen) {
      this.closeMenu();
    }
  };

  scrollTo(sectionId: string): void {
    this.setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
