import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule],
  template: `
    <div class="blog-detail" *ngIf="htmlContent" [innerHTML]="htmlContent"></div>
  `,
  styles: [`
    .blog-detail {
      max-width: 800px;
      margin: auto;
      padding: 2rem;
    }
  `]
})
export class BlogDetail implements OnInit{
    private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  htmlContent = '';
  error = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const path = `/blog/${slug}.html`; 
      this.http.get(path, { responseType: 'text' }).subscribe({
        next: html => this.htmlContent = html,
        error: () => this.error = 'Error al cargar la entrada del blog.'
      });
    }
  }
}
