import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerDto, PlayersService } from '@pages/players/data-access/players';
import {
  BehaviorSubject,
  ReplaySubject,
  filter,
  map,
  tap,
  withLatestFrom,
} from 'rxjs';

export abstract class CurrentPlayerService {
  protected readonly playersService = inject(PlayersService);

  protected readonly _currentPlayer$ = new ReplaySubject<PlayerDto | undefined>(
    1,
  );
  protected readonly _nextPlayer$ = new BehaviorSubject<void>(void 0);

  protected _currentIndex = 0;

  readonly currentPlayer$ = this._currentPlayer$.asObservable();

  constructor() {
    this._nextPlayer$
      .pipe(
        takeUntilDestroyed(),
        map(() => this.playersService.players()),
        tap((players) => {
          if (this._currentIndex >= players.length) this._currentIndex = 0;
        }),
        map((players) => players.at(this._currentIndex++)),
      )
      .subscribe((player) => {
        this._currentPlayer$.next(player);
      });

    this.playersService.playerAdded$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this._currentIndex++;
      });

    this.playersService.playerRemoved$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.currentPlayer$),
        filter(([removedId, currentPlayer]) => removedId === currentPlayer?.id),
        tap(() => {
          this._currentIndex--;
        }),
      )
      .subscribe(() => {
        this.changeCurrentPlayer();
      });
  }

  changeCurrentPlayer(): void {
    this._nextPlayer$.next();
  }
}
