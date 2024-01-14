import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { PlayersService } from '@common/services/players';

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

  protected readonly addPlayerForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\d ]+$/)],
  });

  protected addPlayer() {
    this.addPlayerForm.markAllAsTouched();

    if (this.addPlayerForm.invalid) return;

    const name = this.normalizeName(this.addPlayerForm.controls.name.value);
    if (!name) return;

    this.playersService.add({ id: name });
    this.addPlayerForm.reset();
  }

  protected getErrorMessage(control: Readonly<AbstractControl>) {
    if (control.hasError('pattern')) return 'Nombre inválido';

    return '';
  }

  private normalizeName(name: string) {
    return name.trim().toLowerCase();
  }
}
