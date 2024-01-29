import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {
  readonly face = input.required<number>();
}
