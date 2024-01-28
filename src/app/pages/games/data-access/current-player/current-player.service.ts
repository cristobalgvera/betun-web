import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlayerDto, PlayersService } from '@pages/players/data-access/players';
import { ReplaySubject, Subject, map, tap } from 'rxjs';

export abstract class CurrentPlayerService {
  protected readonly playersService = inject(PlayersService);

  protected readonly _currentPlayer$ = new ReplaySubject<PlayerDto>(1);
  protected readonly _nextPlayer$ = new Subject<void>();

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
      )
      .subscribe((players) => {
        this._currentPlayer$.next(players[this._currentIndex++]);
      });

    this._nextPlayer$.next();
  }

  changeCurrentPlayer(): void {
    this._nextPlayer$.next();
  }
}
