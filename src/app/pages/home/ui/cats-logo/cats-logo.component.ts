import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cats-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cats-logo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatsLogoComponent {
  protected readonly HTTP_CATS = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 207, 208, 226, 301, 302,
    303, 305, 307, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
    412, 413, 415, 416, 417, 420, 422, 424, 425, 426, 428, 429, 450, 502, 506,
    509, 510, 599,
  ] as const;

  protected readonly selectedHttpCats = new Set<number>();

  protected readonly currentImage$ = new BehaviorSubject<string>(
    this.getRandomHttpCatUrl(),
  );

  protected changeImage() {
    this.currentImage$.next(this.getRandomHttpCatUrl());
  }

  private getRandomHttpCatUrl(): string {
    if (this.selectedHttpCats.size === this.HTTP_CATS.length)
      this.selectedHttpCats.clear();

    const httpCat =
      this.HTTP_CATS[Math.floor(Math.random() * this.HTTP_CATS.length)];

    if (this.selectedHttpCats.has(httpCat)) return this.getRandomHttpCatUrl();

    this.selectedHttpCats.add(httpCat);

    return `https://http.cat/${httpCat}`;
  }
}
