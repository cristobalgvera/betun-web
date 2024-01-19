import { PlayerDto } from '@pages/players/data-access/players';

export type CurrentPlayerDto = Pick<PlayerDto, 'id' | 'name' | 'avatarUri'>;
