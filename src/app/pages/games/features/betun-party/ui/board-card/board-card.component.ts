import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RankedPlayerDto } from '@pages/games/data-access/ranking';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './board-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  @Input({ required: true }) rankedPlayers!: readonly RankedPlayerDto[];
}
