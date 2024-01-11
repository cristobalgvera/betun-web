import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PlayersService } from '@common/services';
import { AddPlayerFormComponent } from './features/add-player-form';
import {
  CurrentPlayerDto,
  CurrentPlayersComponent,
} from './ui/current-players';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CurrentPlayersComponent, AddPlayerFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-players.component.html',
})
export class AddPlayersComponent {
  private readonly playersService = inject(PlayersService);

  protected readonly currentPlayers = computed<readonly CurrentPlayerDto[]>(
    () => this.playersService.players().map((player) => ({ name: player.id })),
  );

  protected removePlayer(name: string) {
    this.playersService.remove(name);
  }
}