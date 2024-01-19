import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { map } from 'rxjs';
import { BackButtonComponent } from './back-button';
import { NavigationService } from './navigation';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, BackButtonComponent],
  templateUrl: './toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private static readonly NO_BACK_BUTTON_URLS: ReadonlySet<string> = new Set([
    '/',
  ]);

  private readonly navigationService = inject(NavigationService);

  protected readonly showBackButton = toSignal(
    this.navigationService.currentUrl$.pipe(
      map((url) => !ToolbarComponent.NO_BACK_BUTTON_URLS.has(url)),
    ),
    { initialValue: false },
  );
}
