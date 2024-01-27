import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerDto, PlayersService } from '@pages/players/data-access/players';
import { ActivatePlayerDeletionService } from './data-access/activate-player-deletion';
import { AddPlayerFormComponent } from './features/add-player-form';
import { ReadyToPlayComponent } from './features/ready-to-play';
import { ActivatePlayersDeletionButtonComponent } from './ui/activate-players-deletion-button';
import {
  CurrentPlayerDto,
  CurrentPlayersComponent,
} from './ui/current-players';

@Component({
  selector: 'app-add-players',
  standalone: true,
  imports: [
    CurrentPlayersComponent,
    ReadyToPlayComponent,
    AddPlayerFormComponent,
    ActivatePlayersDeletionButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-players.component.html',
})
export class AddPlayersComponent {
  private readonly playersService = inject(PlayersService);
  private readonly activatePlayersDeletionService = inject(
    ActivatePlayerDeletionService,
  );
  private readonly snackBarService = inject(MatSnackBar);

  protected readonly currentPlayers = computed<readonly CurrentPlayerDto[]>(
    this.playersService.players,
  );
  protected readonly playerDeletionActive =
    this.activatePlayersDeletionService.playerDeletionActive;

  @ViewChild('currentPlayersContainer', { static: true })
  private readonly currentPlayersContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    this.playersService.playerExists$
      .pipe(takeUntilDestroyed())
      .subscribe(({ name }) => {
        this.snackBarService.open(`${name} ya está en la lista`, 'OK', {
          verticalPosition: 'top',
          duration: 2_000,
        });
      });

    this.playersService.playerAdded$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.currentPlayersContainer.nativeElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
  }

  protected togglePlayerDeletion() {
    this.activatePlayersDeletionService.togglePlayerDeletion();
  }

  protected removePlayer(id: PlayerDto['id']) {
    this.activatePlayersDeletionService.deletePlayer(id);
  }

  protected regenerateAvatar(id: PlayerDto['id']) {
    this.playersService.regenerateAvatar(id);
  }
}
