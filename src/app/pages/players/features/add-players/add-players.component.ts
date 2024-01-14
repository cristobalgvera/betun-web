import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayersService } from '@common/services/players';
import { PlayerDto } from '@common/services/players/dtos';
import { filter, tap } from 'rxjs';
import { AddPlayerFormComponent } from './features/add-player-form';
import {
  CurrentPlayerDto,
  CurrentPlayersComponent,
} from './ui/current-players';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [CurrentPlayersComponent, AddPlayerFormComponent, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-players.component.html',
})
export class AddPlayersComponent {
  private readonly playersService = inject(PlayersService);
  private readonly snackBarService = inject(MatSnackBar);

  protected readonly currentPlayers = computed<readonly CurrentPlayerDto[]>(
    this.playersService.players,
  );

  @ViewChild('currentPlayersContainer', { static: true })
  private readonly currentPlayersContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    this.playersService.playerExists$
      .pipe(
        takeUntilDestroyed(),
        tap(({ name }) => {
          this.snackBarService.open(`${name} ya está en la lista`, 'OK', {
            verticalPosition: 'top',
            duration: 2_000,
          });
        }),
      )
      .subscribe();

    this.playersService.playerAdded$
      .pipe(
        takeUntilDestroyed(),
        filter((added) => added),
        tap(() => {
          this.currentPlayersContainer.nativeElement.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }),
      )
      .subscribe();
  }

  protected removePlayer(id: PlayerDto['id']) {
    this.playersService.remove(id);
  }

  protected regenerateAvatar(id: PlayerDto['id']) {
    this.playersService.regenerateAvatar(id);
  }
}
