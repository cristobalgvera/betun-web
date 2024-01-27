import { RankedPlayerDto } from './ranked-player.dto';

export type AddPointsDto = Pick<RankedPlayerDto, 'id'> &
  Readonly<{ points: RankedPlayerDto['score'] }>;
