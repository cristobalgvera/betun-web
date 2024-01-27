import { Injectable, inject } from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { PlayersService } from '@pages/players/data-access/players';
import { BehaviorSubject, Subject, filter, map, withLatestFrom } from 'rxjs';
import { AddPointsDto, RankedPlayerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class RankingService {
  private readonly playersService = inject(PlayersService);

  readonly #playersWithScore$ = new BehaviorSubject<
    ReadonlyMap<RankedPlayerDto['id'], RankedPlayerDto>
  >(new Map());

  readonly #addPoints$ = new Subject<AddPointsDto>();
  readonly #resetRanking$ = new Subject<void>();

  readonly rankedPlayers = toSignal(
    this.#playersWithScore$.pipe(
      map((players) => Array.from(players.values())),
      map((players) => players.sort((a, b) => b.score - a.score)),
    ),
    { initialValue: [] },
  );

  constructor() {
    toObservable(this.playersService.players)
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.#playersWithScore$),
        map(([players, playersWithScore]) =>
          players.map<[RankedPlayerDto['id'], RankedPlayerDto]>((player) => [
            player.id,
            { ...player, score: playersWithScore.get(player.id)?.score ?? 0 },
          ]),
        ),
        map((players) => new Map(players)),
      )
      .subscribe((rankedPlayers) => {
        this.#playersWithScore$.next(rankedPlayers);
      });

    this.#resetRanking$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.#playersWithScore$),
        map(([, playersWithScore]) =>
          Array.from(playersWithScore.values()).map<
            [RankedPlayerDto['id'], RankedPlayerDto]
          >((player) => [player.id, { ...player, score: 0 }]),
        ),
        map((playersWithScores) => new Map(playersWithScores)),
      )
      .subscribe((playersWithResetedScore) => {
        this.#playersWithScore$.next(playersWithResetedScore);
      });

    this.#addPoints$
      .pipe(
        takeUntilDestroyed(),
        withLatestFrom(this.#playersWithScore$),
        filter(([{ id }, playersRanking]) => !!playersRanking.get(id)),
      )
      .subscribe(([{ id, points }, playersRanking]) => {
        const player = playersRanking.get(id);

        if (!player) return;

        this.#playersWithScore$.next(
          new Map(playersRanking).set(id, {
            ...player,
            score: player.score + points,
          }),
        );
      });
  }

  addPoints({ id, points }: AddPointsDto): void {
    this.#addPoints$.next({ id, points });
  }

  resetRanking(): void {
    this.#resetRanking$.next();
  }
}
