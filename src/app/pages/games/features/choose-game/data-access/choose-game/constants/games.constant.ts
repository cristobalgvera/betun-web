import { GameDto } from '../dtos';

export const BETUN_PARTY = {
  name: 'Betún Party',
  path: 'betun-party',
} as const satisfies Omit<GameDto, 'id'>;

export const GAMES = [BETUN_PARTY] satisfies readonly Omit<GameDto, 'id'>[];
