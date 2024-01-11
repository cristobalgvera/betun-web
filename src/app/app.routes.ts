import { Routes } from '@angular/router';
import { playersRoutes } from '@pages/players';

export const routes: Routes = [{ path: 'players', children: playersRoutes }];
