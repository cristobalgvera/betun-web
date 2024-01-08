import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { PlayerDto } from './dtos';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  private readonly _players$ = new BehaviorSubject<
    ReadonlyMap<PlayerDto['id'], PlayerDto>
  >(new Map());

  readonly players$ = this._players$.pipe(
    map((players): readonly PlayerDto[] => Array.from(players.values())),
  );

  add(player: PlayerDto): void {
    this._players$.next(new Map(this._players$.value).set(player.id, player));
  }

  remove(id: PlayerDto['id']): void {
    const players = new Map(this._players$.value);
    players.delete(id);

    this._players$.next(players);
  }

  clear(): void {
    this._players$.next(new Map());
  }
}
