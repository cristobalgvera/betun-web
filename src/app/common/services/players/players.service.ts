import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Subject, map, pairwise } from 'rxjs';
import { PlayerDto } from './dtos';
import { GenerateAvatarService } from './generate-avatar.service';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly generateAvatarService = inject(GenerateAvatarService);

  private readonly players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());
  private readonly _playerExists$ = new Subject<Pick<PlayerDto, 'name'>>();

  readonly players = toSignal(
    this.players$.pipe(
      map((players): readonly PlayerDto[] =>
        Array.from(players.values()).reverse(),
      ),
    ),
    { initialValue: [] },
  );
  readonly playerExists$ = this._playerExists$.asObservable();
  readonly playerAdded$ = this.players$.pipe(
    pairwise(),
    map(([prev, curr]) => prev.size < curr.size),
  );

  add(playerName: Pick<PlayerDto, 'name'>): void {
    const id = playerName.name.toLocaleLowerCase();

    if (this.players$.value.has(id)) {
      this._playerExists$.next(playerName);
      return;
    }

    this.players$.next(
      new Map(this.players$.value).set(id, {
        ...playerName,
        id,
        avatarUri: this.generateAvatarService.generateAvatarUri(),
      }),
    );
  }

  remove(id: PlayerDto['id']): void {
    const players = new Map(this.players$.value);
    players.delete(id);

    this.players$.next(players);
  }

  clear(): void {
    this.players$.next(new Map());
  }

  regenerateAvatar(id: PlayerDto['id']): void {
    const currentPlayer = this.players$.value.get(id);

    if (!currentPlayer) return;

    this.players$.next(
      new Map(this.players$.value).set(id, {
        ...currentPlayer,
        avatarUri: this.generateAvatarService.generateAvatarUri(),
      }),
    );
  }
}
