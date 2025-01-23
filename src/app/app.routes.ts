import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/artist-selector/components/gradient-bg/gradient-bg.component')
        .then(m => m.GradientBgComponent),
  },
];
