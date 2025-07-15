import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostMeta, BlogService } from '../../core/services/blog-service';

export interface BlogPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  readingTime: number;
  slug: string;
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit{
  posts: BlogPostMeta[] = [];
  currentPage = 1;
  postsPerPage = 4;

  
  private blogService = inject(BlogService) 

  ngOnInit(): void {
    this.blogService.getBlogPosts().subscribe(data => {
      this.posts = data;
    });
  }

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    return this.posts.slice(start, start + this.postsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
  this.currentPage = page;
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}
}
