import { Routes } from '@angular/router';
import { ChooseGameComponent } from './features/choose-game';

export const gamesRoutes: Routes = [
  { path: 'choose-game', component: ChooseGameComponent },
  { path: '', redirectTo: 'choose-game', pathMatch: 'full' },
];
