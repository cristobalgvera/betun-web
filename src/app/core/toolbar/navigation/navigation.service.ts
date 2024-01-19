import { Location } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly #history: string[] = [];
  readonly currentUrl$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects),
  );

  constructor() {
    this.currentUrl$
      .pipe(
        takeUntilDestroyed(),
        tap((url) => this.#history.push(url)),
      )
      .subscribe();
  }

  back() {
    this.#history.pop();

    if (this.#history.length === 0) {
      void this.router.navigateByUrl('/');
      return;
    }

    this.location.back();
  }
}
