import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map } from 'rxjs';
import { PlayerDto } from './dtos';
import { GenerateAvatarService } from './generate-avatar.service';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly generateAvatarService = inject(GenerateAvatarService);

  private readonly players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());

  readonly players = toSignal(
    this.players$.pipe(
      map((players): readonly PlayerDto[] =>
        Array.from(players.values()).reverse(),
      ),
    ),
    { initialValue: [] },
  );

  add(player: Pick<PlayerDto, 'id'>): void {
    this.players$.next(
      new Map(this.players$.value).set(player.id, {
        ...player,
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
}
