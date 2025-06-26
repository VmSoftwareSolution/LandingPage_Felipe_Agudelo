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
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio {

  gridItems = [
  {
    title: 'Lighthouse',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fit=crop&w=600&h=800&q=80'
  },
  {
    title: 'Coding Desk',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=600&h=800&q=80'
  },
  {
    title: 'Healthy Food',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fit=crop&w=600&h=800&q=80'
  },
  {
    title: 'Wood Chair',
    category: 'Craft Design',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?fit=crop&w=600&h=800&q=80'
  },
  {
    title: 'Skate Street',
    category: 'Urban Style',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?fit=crop&w=600&h=800&q=80'
  },
  {
    title: 'Plant Setup',
    category: 'Minimal Design',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=600&h=800&q=80'
  }
];

getItemHeightClass(index: number): string {
  const classes = ['tall', 'medium', 'short'];
  return classes[index % classes.length];
}

}
