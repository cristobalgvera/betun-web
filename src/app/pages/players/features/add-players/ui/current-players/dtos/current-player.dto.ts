import { PlayerDto } from '@common/services/players/dtos';

export type CurrentPlayerDto = Pick<PlayerDto, 'id' | 'name' | 'avatarUri'>;
