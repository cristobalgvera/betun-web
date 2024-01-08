import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let underTest: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    underTest = TestBed.inject(PlayersService);
  });

  describe('add', () => {
    it('should add the player provided', async () => {
      const expected = { name: 'player' };

      underTest.add(expected as any);

      const actual = await firstValueFrom(underTest.players$);

      expect(actual).toPartiallyContain(expected);
    });

    describe('when the player already exists', () => {
      it('should replace the player with the provided one', async () => {
        const expected = { id: 'player', name: 'new' };

        underTest.add({ ...expected, name: 'old' } as any);
        underTest.add(expected as any);

        const actual = await firstValueFrom(underTest.players$);

        expect(actual).toPartiallyContain(expected);
      });
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      underTest.add({ id: 'player-1' } as any);
      underTest.add({ id: 'player-2' } as any);
    });

    it('should remove the player with the provided id', async () => {
      const nonExpected = { id: 'non-expected' };

      underTest.add(nonExpected as any);
      underTest.remove(nonExpected.id);

      const actual = await firstValueFrom(underTest.players$);

      expect(actual).not.toContain(nonExpected);
    });
  });

  describe('clear', () => {
    it('should remove all players', async () => {
      underTest.add({ id: 'player-1' } as any);
      underTest.add({ id: 'player-2' } as any);

      underTest.clear();

      const actual = await firstValueFrom(underTest.players$);

      expect(actual).toBeEmpty();
    });
  });
});
