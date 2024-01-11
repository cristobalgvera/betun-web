import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationDto } from './dtos';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styles: `.active { font-weight: bold; }`,
})
export class NavigationComponent {
  protected readonly navigationItems: readonly NavigationDto[] = [
    { route: '', label: 'Home' },
    { route: 'players', label: 'Players' },
  ];
}
