import { PlayerDto } from '@pages/players/data-access/players';

export type RankedPlayerDto = Pick<PlayerDto, 'id' | 'name' | 'avatarUri'> &
  Readonly<{ score: number }>;
