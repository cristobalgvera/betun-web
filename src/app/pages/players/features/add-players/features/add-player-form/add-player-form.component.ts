import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlayersService } from '@pages/players/data-access/players';
import { ActivatePlayerDeletionService } from '../../data-access/activate-player-deletion';

@Component({
  selector: 'app-add-player-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-player-form.component.html',
})
export class AddPlayerFormComponent {
  private readonly playersService = inject(PlayersService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatePlayersDeletionService = inject(
    ActivatePlayerDeletionService,
  );

  protected readonly addPlayerForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\d ]+$/)],
  });

  constructor() {
    toObservable(this.activatePlayersDeletionService.playerDeletionActive)
      .pipe(takeUntilDestroyed())
      .subscribe((playerDeletionActive) => {
        if (playerDeletionActive) this.addPlayerForm.disable();
        else this.addPlayerForm.enable();
      });
  }

  protected addPlayer() {
    this.addPlayerForm.markAllAsTouched();

    if (this.addPlayerForm.invalid) return;

    const name = this.normalizeName(this.addPlayerForm.controls.name.value);
    if (!name) return;

    this.playersService.add({ name });
    this.addPlayerForm.reset();
  }

  protected getErrorMessage(control: Readonly<AbstractControl>) {
    if (control.hasError('pattern')) return 'Nombre inválido';

    return '';
  }

  private normalizeName(name: string) {
    return name.trim();
  }
}
