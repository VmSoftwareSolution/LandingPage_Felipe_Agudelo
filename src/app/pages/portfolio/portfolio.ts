import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio {

  public isPreviewVisible = false;
  public currentIndex = 0;

  public gridItems = [
  {
    title: 'Lighthouse',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fit=crop&w=600&h=800&q=80',
    description: 'Proyecto de diseño web enfocado en sitios costeros con experiencia responsiva.',
    link: 'https://example.com/lighthouse'
  },
  {
    title: 'Coding Desk',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=600&h=800&q=80',
    description: 'Interfaz para desarrolladores, enfocada en productividad y estética.',
    link: 'https://example.com/coding-desk'
  },
  {
    title: 'Healthy Food',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fit=crop&w=600&h=800&q=80',
    description: 'Aplicación de recetas saludables con enfoque en nutrición y estilo de vida.',
    link: 'https://example.com/healthy-food'
  },
  {
    title: 'Wood Chair',
    category: 'Craft Design',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=600&h=800&q=80',
    description: 'Diseño artesanal de sillas con materiales sostenibles y estética minimalista.',
    link: 'https://example.com/wood-chair'
  },
  {
    title: 'Skate Street',
    category: 'Urban Style',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?fit=crop&w=600&h=800&q=80',
    description: 'Videojuego 3D de skate callejero con física realista.',
    link: 'https://example.com/skate-street'
  },
  {
    title: 'Plant Setup',
    category: 'Minimal Design',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=600&h=800&q=80',
    description: 'Dashboard de organización para espacios de trabajo con plantas decorativas.',
    link: 'https://example.com/plant-setup'
  }
  ];

  public getItemHeightClass(index: number): string {
    const classes = ['tall', 'medium', 'short'];
    return classes[index % classes.length];
  }

  get currentImage() {
    return this.gridItems[this.currentIndex];
  }

  public openPreview(index: number) {
    this.currentIndex = index;
    this.isPreviewVisible = true;
  }

  public closePreview() {
    this.isPreviewVisible = false;
  }

  public previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.gridItems.length) % this.gridItems.length;
  }

  public nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.gridItems.length;
  }

}
