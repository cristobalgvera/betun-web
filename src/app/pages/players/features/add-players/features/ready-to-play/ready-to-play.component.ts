import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PlayersService } from '@pages/players/data-access/players';

@Component({
  selector: 'app-ready-to-play',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './ready-to-play.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadyToPlayComponent {
  private readonly playersService = inject(PlayersService);

  protected readonly totalPlayers = computed(
    () => this.playersService.players().length,
  );
}
