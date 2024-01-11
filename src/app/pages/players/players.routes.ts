import { Routes } from '@angular/router';

export const playersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./players.component').then((m) => m.PlayersComponent),
  },
];
