import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/landinpage/landinpage').then(m => m.Landinpage)
    }
    ,{
      path: 'blog/:slug',
      loadComponent: () => import('./pages/blog/blog-detail').then(m => m.BlogDetail)
    },
];
