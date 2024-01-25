import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-player-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './activate-players-deletion-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivatePlayersDeletionButtonComponent {
  @Input({ transform: booleanAttribute }) disabled!: boolean;
  @Input({ transform: booleanAttribute }) playersDeletionActivated!: boolean;

  @Output() readonly togglePlayerDeletion = new EventEmitter<void>();

  protected onTogglePlayerDeletion(): void {
    this.togglePlayerDeletion.emit();
  }
}
