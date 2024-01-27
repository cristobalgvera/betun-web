import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RankingService } from '@pages/games/data-access/ranking';
import { BoardCardComponent } from './ui/board-card';

@Component({
  selector: 'app-betun-party',
  standalone: true,
  imports: [CommonModule, BoardCardComponent],
  templateUrl: './betun-party.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetunPartyComponent {
  private readonly rankingService = inject(RankingService);

  protected readonly rankedPlayers = this.rankingService.rankedPlayers;
}
