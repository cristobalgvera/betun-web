import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './current-players.component.html',
})
export class CurrentPlayersComponent {
  @Input({ required: true }) players!: readonly CurrentPlayerDto[];
  @Input() playerDeletionActive = false;

  @Output() removePlayer = new EventEmitter<PlayerDto['id']>();
  @Output() regenerateAvatar = new EventEmitter<PlayerDto['id']>();

  protected actionatePlayer(playerId: PlayerDto['id']) {
    if (this.playerDeletionActive) this.onRemovePlayer(playerId);
    else this.onRegenerateAvatar(playerId);
  }

  private onRemovePlayer(playerId: PlayerDto['id']): void {
    this.removePlayer.emit(playerId);
  }

  private onRegenerateAvatar(playerId: PlayerDto['id']): void {
    this.regenerateAvatar.emit(playerId);
  }
}
