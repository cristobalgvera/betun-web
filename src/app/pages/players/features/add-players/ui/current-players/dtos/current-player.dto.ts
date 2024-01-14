import { PlayerDto } from '@common/services/players/dtos';

export type CurrentPlayerDto = Readonly<{
  name: string;
  avatarUri: PlayerDto['avatarUri'];
}>;
