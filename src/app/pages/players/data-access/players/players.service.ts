import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, filter, map, pairwise } from 'rxjs';
import { PlayerDto } from './dtos';
import { GenerateAvatarService } from './generate-avatar.service';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly generateAvatarService = inject(GenerateAvatarService);

  readonly #playerExists$ = new Subject<Pick<PlayerDto, 'name'>>();
  readonly #players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());

  readonly players = toSignal(
    this.#players$.pipe(
      map((players): readonly PlayerDto[] =>
        Array.from(players.values()).reverse(),
      ),
    ),
    { initialValue: [] },
  );
  readonly playerExists$ = this.#playerExists$.asObservable();
  readonly playerWasAdded$ = this.#players$.pipe(
    pairwise(),
    map(([prev, curr]) => prev.size < curr.size),
    filter(Boolean),
  );

  // TODO: Refactor to remove imperative code
  add(playerName: Pick<PlayerDto, 'name'>): void {
    const id = playerName.name.toLocaleLowerCase();

    if (this.#players$.value.has(id)) {
      this.#playerExists$.next(playerName);
      return;
    }

    this.#players$.next(
      new Map(this.#players$.value).set(id, {
        ...playerName,
        id,
        avatarUri: this.generateAvatarService.generateAvatarUri(),
      }),
    );
  }

  // TODO: Refactor to remove imperative code
  remove(id: PlayerDto['id']): void {
    const players = new Map(this.#players$.value);
    players.delete(id);

    this.#players$.next(players);
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
