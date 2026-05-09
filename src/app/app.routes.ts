import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Aurea Beauty Studio — Centro Estetico Milano Brera'
  },
  {
    path: 'trattamenti',
    loadComponent: () => import('./pages/trattamenti/trattamenti.component').then((m) => m.TrattamentiComponent),
    title: 'Trattamenti — Aurea Beauty Studio'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Aurea Beauty Studio'
  },
  {
    path: 'lavori',
    loadComponent: () => import('./pages/lavori/lavori.component').then((m) => m.LavoriComponent),
    title: 'Gallery — Aurea Beauty Studio'
  },
  {
    path: 'prenota',
    loadComponent: () => import('./pages/prenota/prenota.component').then((m) => m.PrenotaComponent),
    title: 'Prenota — Aurea Beauty Studio'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
