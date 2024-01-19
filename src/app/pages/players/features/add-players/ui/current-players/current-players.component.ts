import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlayerDto } from '@pages/players/data-access/players';
import { CurrentPlayerDto } from './dtos';

@Component({
  selector: 'app-current-players',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './current-players.component.html',
})
export class CurrentPlayersComponent {
  @Input({ required: true }) players!: readonly CurrentPlayerDto[];

  @Output() removePlayer = new EventEmitter<PlayerDto['id']>();
  @Output() regenerateAvatar = new EventEmitter<PlayerDto['id']>();

  onRemovePlayer(playerId: PlayerDto['id']): void {
    this.removePlayer.emit(playerId);
  }

  onRegenerateAvatar(playerId: PlayerDto['id']): void {
    this.regenerateAvatar.emit(playerId);
  }
}
