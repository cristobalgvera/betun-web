import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { PlayersService } from '../data-access/players';

const canActivateChild: CanActivateChildFn = () => {
  const playersService = inject(PlayersService);
  const router = inject(Router);

  const hasPlayers = !!playersService.players().length;

  if (!hasPlayers) void router.navigate(['/players', 'add-players']);

  return hasPlayers;
};

export const PlayersRequiredGuard = {
  canActivateChild,
};
