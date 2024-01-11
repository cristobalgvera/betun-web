import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map } from 'rxjs';
import { PlayerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());

  readonly players = toSignal(
    this.players$.pipe(
      map((players): readonly PlayerDto[] => Array.from(players.values())),
    ),
    { initialValue: [] },
  );

  add(player: PlayerDto): void {
    this.players$.next(new Map(this.players$.value).set(player.id, player));
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
