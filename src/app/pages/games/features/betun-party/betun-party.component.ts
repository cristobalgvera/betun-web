import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DiceRollerService } from '@pages/games/data-access/dice-roller';
import { RankingService } from '@pages/games/data-access/ranking';
import { DiceComponent } from '@pages/games/ui/dice';
import { filter, tap, withLatestFrom } from 'rxjs';
import { CurrentPlayerBetunPartyService } from './data-access/current-player';
import { BoardCardComponent } from './ui/board-card';

@Component({
  selector: 'app-betun-party',
  standalone: true,
  imports: [CommonModule, BoardCardComponent, DiceComponent],
  templateUrl: './betun-party.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetunPartyComponent {
  private readonly rankingService = inject(RankingService);
  private readonly diceRollerService = inject(DiceRollerService);
  private readonly currentPlayerService = inject(
    CurrentPlayerBetunPartyService,
  );

  protected readonly rankedPlayers = this.rankingService.rankedPlayers;
  protected readonly currentPlayer = toSignal(
    this.currentPlayerService.currentPlayer$.pipe(filter(Boolean)),
  );
  protected readonly currentRoll = toSignal(this.diceRollerService.roll$, {
    initialValue: 6,
  });

  constructor() {
    this.diceRollerService.result$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(
          this.currentPlayerService.currentPlayer$.pipe(filter(Boolean)),
        ),
        tap(([result, currentPlayer]) => {
          this.rankingService.addPoints({
            id: currentPlayer.id,
            points: result,
          });
        }),
      )
      .subscribe(() => {
        this.currentPlayerService.changeCurrentPlayer();
      });
  }

  protected rollDice(): void {
    this.diceRollerService.roll();
  }
}
