import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BlogPostMeta {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  readingTime: number;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
private http = inject(HttpClient);

  getBlogPosts(): Observable<BlogPostMeta[]> {
    return this.http.get<BlogPostMeta[]>('/blog/blog-post.json');
  }

  getPostContent(slug: string): Observable<string> {
    return this.http.get(`assets/blog-posts/${slug}.html`, { responseType: 'text' });
  }
}
