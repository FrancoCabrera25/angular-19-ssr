import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/country/country.component'),
  },
  {
    path: 'country/:code',
    loadComponent: () =>
      import('./pages/country/detail/country-detail.component'),
  },
];
