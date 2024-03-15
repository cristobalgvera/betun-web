import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RankedPlayerDto } from '@pages/games/data-access/ranking';

@Component({
  selector: 'app-board-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './board-card.component.html',
  styles: `
    .inactive.mat-mdc-card {
      opacity: 0.3;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent {
  readonly rankedPlayers = input.required<readonly RankedPlayerDto[]>();
  readonly activePlayerId = input<RankedPlayerDto['id']>();
}
