import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddPlayersComponent } from './features/add-players';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterOutlet, AddPlayersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './players.component.html',
})
export class PlayersComponent {}
