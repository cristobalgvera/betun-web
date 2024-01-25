import { GameDto } from '../dtos';

export const GAMES = [
  { path: 'example', name: 'Example' },
] satisfies readonly Omit<GameDto, 'id'>[];
