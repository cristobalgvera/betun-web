import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [],
  templateUrl: './choose-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseGameComponent {}
