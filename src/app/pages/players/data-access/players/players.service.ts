import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, filter, map, tap } from 'rxjs';
import { PlayerDto } from './dtos';
import { GenerateAvatarService } from './generate-avatar.service';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly generateAvatarService = inject(GenerateAvatarService);

  readonly #players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());

  readonly #addPlayer$ = new Subject<PlayerDto>();
  readonly #playerAdded$ = new Subject<PlayerDto>();
  readonly #playerExists$ = new Subject<Pick<PlayerDto, 'name'>>();

  readonly #removePlayer$ = new Subject<PlayerDto['id']>();
  readonly #playerRemoved$ = new Subject<PlayerDto['id']>();

  readonly playerExists$ = this.#playerExists$.asObservable();
  readonly playerAdded$ = this.#playerAdded$.asObservable();
  readonly playerRemoved$ = this.#playerRemoved$.asObservable();
  readonly players = toSignal(
    this.#players$.pipe(
      map((players): readonly PlayerDto[] =>
        Array.from(players.values()).reverse(),
      ),
    ),
    { initialValue: [] },
  );

  constructor() {
    this.#addPlayer$
      .pipe(
        takeUntilDestroyed(),
        filter(({ id }) => this.#players$.value.has(id)),
      )
      .subscribe((player) => {
        this.#playerExists$.next(player);
      });

    this.#addPlayer$
      .pipe(
        takeUntilDestroyed(),
        filter(({ id }) => !this.#players$.value.has(id)),
        tap((player) => {
          this.#players$.next(
            new Map(this.#players$.value).set(player.id, player),
          );
        }),
      )
      .subscribe((player) => {
        this.#playerAdded$.next(player);
      });

    this.#removePlayer$
      .pipe(
        takeUntilDestroyed(),
        filter((id) => this.#players$.value.has(id)),
        tap((id) => {
          const players = new Map(this.#players$.value);
          players.delete(id);

          this.#players$.next(players);
        }),
      )
      .subscribe((id) => {
        this.#playerRemoved$.next(id);
      });
  }

  add(playerName: Pick<PlayerDto, 'name'>): void {
    this.#addPlayer$.next({
      name: playerName.name,
      id: playerName.name.toLocaleLowerCase(),
      avatarUri: this.generateAvatarService.generateAvatarUri(),
    });
  }

  remove(id: PlayerDto['id']): void {
    this.#removePlayer$.next(id);
  }

  clear(): void {
    this.#players$.next(new Map());
  }

  // TODO: Refactor to remove imperative code
  regenerateAvatar(id: PlayerDto['id']): void {
    const currentPlayer = this.#players$.value.get(id);

    if (!currentPlayer) return;

    this.#players$.next(
      new Map(this.#players$.value).set(id, {
        ...currentPlayer,
        avatarUri: this.generateAvatarService.generateAvatarUri(),
      }),
    );
  }
}
