import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CurrentPlayerDto } from './dtos';

@Component({
  selector: 'app-current-players',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './current-players.component.html',
})
export class CurrentPlayersComponent {
  @Input({ required: true }) players!: readonly CurrentPlayerDto[];

  @Output() removePlayer = new EventEmitter<CurrentPlayerDto['name']>();

  onRemovePlayer(player: Pick<CurrentPlayerDto, 'name'>): void {
    this.removePlayer.emit(player.name);
  }
}
