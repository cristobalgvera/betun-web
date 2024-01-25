import { Injectable, inject } from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerDto, PlayersService } from '@pages/players/data-access/players';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  shareReplay,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActivatePlayerDeletionService {
  private readonly playersService = inject(PlayersService);
  private readonly router = inject(Router);

  readonly #playerDeletionActive$ = new BehaviorSubject(false);
  readonly #deletePlayer$ = new Subject<PlayerDto['id']>();

  readonly playerDeletionActive = toSignal(
    this.#playerDeletionActive$.pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
    { initialValue: false },
  );

  constructor() {
    combineLatest([this.#playerDeletionActive$, this.#deletePlayer$])
      .pipe(
        takeUntilDestroyed(),
        filter(([playerDeletionActive]) => playerDeletionActive),
      )
      .subscribe(([, id]) => {
        this.playersService.remove(id);
      });

    combineLatest([
      toObservable(this.playersService.players).pipe(
        filter((players) => !players.length),
      ),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      ),
    ])
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.#playerDeletionActive$.next(false);
      });
  }

  togglePlayerDeletion(): void {
    this.#playerDeletionActive$.next(!this.#playerDeletionActive$.value);
  }

  deletePlayer(id: PlayerDto['id']): void {
    this.#deletePlayer$.next(id);
  }
}
