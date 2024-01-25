import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ReplaySubject, map, of, switchMap } from 'rxjs';
import { GAMES } from './constants';
import { GameDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class ChooseGameService {
  private static readonly GAMES_MAP: ReadonlyMap<GameDto['id'], GameDto> =
    new Map(GAMES.map((game, id) => [id, { ...game, id }]));

  private readonly router = inject(Router);

  readonly #currentGame$ = new ReplaySubject<GameDto>(1);

  // TODO: Add a network request to retrieve games
  readonly games = toSignal(
    of(ChooseGameService.GAMES_MAP).pipe(
      map((gamesMap) => gamesMap.values()),
      map((games) => Array.from(games)),
    ),
    { initialValue: [] },
  );

  readonly currentGame$ = this.#currentGame$.asObservable();

  constructor() {
    this.#currentGame$
      .pipe(
        takeUntilDestroyed(),
        switchMap((game) => this.router.navigate(['games', game.path])),
      )
      .subscribe();
  }

  chooseGame(id: GameDto['id']): void {
    const game = ChooseGameService.GAMES_MAP.get(id);

    // TODO: Handle error
    if (!game) return;

    this.#currentGame$.next(game);
  }
}
