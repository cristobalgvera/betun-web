import { Routes } from '@angular/router';
import { homeRoutes } from '@pages/home';
import { playersRoutes } from '@pages/players';

export const routes: Routes = [
  { path: '', children: homeRoutes },
  { path: 'players', children: playersRoutes },
  { path: '**', redirectTo: '' },
];
