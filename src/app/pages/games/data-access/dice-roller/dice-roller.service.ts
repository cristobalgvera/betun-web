import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  filter,
  finalize,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiceRollerService {
  private static readonly SIDES = 6;

  readonly #isRolling$ = new BehaviorSubject(false);
  readonly #roll$ = new Subject<void>();

  readonly roll$ = this.#roll$.pipe(
    tap(() => {
      this.#isRolling$.next(true);
    }),
    switchMap(() =>
      timer(0, 50).pipe(
        finalize(() => {
          this.#isRolling$.next(false);
        }),
        take(10),
        map(() => this.calculateResult()),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly isRolling$ = this.#isRolling$.asObservable();

  readonly result$ = this.#isRolling$.pipe(
    filter((isRolling) => !isRolling),
    withLatestFrom(this.roll$),
    map(([, result]) => result),
  );

  private calculateResult() {
    const min = 1;

    return Math.floor(
      Math.random() * (DiceRollerService.SIDES - min + 1) + min,
    );
  }

  roll() {
    this.#roll$.next();
  }
}
