import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CatsLogoComponent } from './ui/cats-logo';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CatsLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
})
export class HomeComponent {}
