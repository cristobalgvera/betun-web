import { Routes } from '@angular/router';
import { AddPlayersComponent } from './features/add-players';

export const playersRoutes: Routes = [
  { path: 'add-players', component: AddPlayersComponent },
  { path: '', redirectTo: 'add-players', pathMatch: 'full' },
];
