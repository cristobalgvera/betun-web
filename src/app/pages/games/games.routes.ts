import { Routes } from '@angular/router';
import { BETUN_PARTY, ChooseGameComponent } from './features/choose-game';

export const gamesRoutes: Routes = [
  { path: 'choose-game', component: ChooseGameComponent },
  {
    path: BETUN_PARTY.path,
    loadComponent: () =>
      import('./features/betun-party').then((m) => m.BetunPartyComponent),
  },
  { path: '', redirectTo: 'choose-game', pathMatch: 'full' },
];
