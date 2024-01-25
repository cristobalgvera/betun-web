import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChooseGameService, GameDto } from './data-access/choose-game';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatRippleModule, MatButtonModule],
  templateUrl: './choose-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent {
  private readonly chooseGameService = inject(ChooseGameService);

  protected readonly games = this.chooseGameService.games;

  protected chooseGame(id: GameDto['id']): void {
    this.chooseGameService.chooseGame(id);
  }
}
