import { Component, computed, inject } from '@angular/core';
import { PlayersService } from '@common/services';
import {
  CurrentPlayerDto,
  CurrentPlayersComponent,
} from './ui/current-players';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CurrentPlayersComponent],
  templateUrl: './add-players.component.html',
})
export class AddPlayersComponent {
  private readonly playersService = inject(PlayersService);

  protected readonly currentPlayers = computed<readonly CurrentPlayerDto[]>(
    () => this.playersService.players().map((player) => ({ name: player.id })),
  );

  constructor() {
    this.addPlayer('Player 1');
    this.addPlayer('Player 2');
    this.addPlayer('Player 3');
  }

  protected addPlayer(name: string) {
    this.playersService.add({ id: name });
  }

  protected removePlayer(name: string) {
    this.playersService.remove(name);
  }
}
