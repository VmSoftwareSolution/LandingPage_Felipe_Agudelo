import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./pages/landinpage/landinpage').then(m => m.Landinpage)
    }
];
