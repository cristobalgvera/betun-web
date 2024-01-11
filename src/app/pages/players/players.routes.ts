import { Routes } from '@angular/router';

export const playersRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./players.component').then((m) => m.PlayersComponent),
  },
  {
    path: 'add-players',
    loadComponent: () =>
      import('./features/add-players').then((m) => m.AddPlayersComponent),
  },
];
