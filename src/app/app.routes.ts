import { Routes } from '@angular/router';
import { gamesRoutes } from '@pages/games';
import { homeRoutes } from '@pages/home';
import { PlayersRequiredGuard, playersRoutes } from '@pages/players';

export const routes: Routes = [
  { path: '', children: homeRoutes },
  { path: 'players', children: playersRoutes },
  {
    path: 'games',
    children: gamesRoutes,
    canActivateChild: [PlayersRequiredGuard.canActivateChild],
  },
  { path: '**', redirectTo: '' },
];
