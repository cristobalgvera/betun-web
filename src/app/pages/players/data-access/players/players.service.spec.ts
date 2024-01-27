import { TestBed, waitForAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { mock } from 'ts-jest-mocker';
import { PlayerDto } from './dtos';
import { GenerateAvatarService } from './generate-avatar.service';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let underTest: PlayersService;
  let generateAvatarService: GenerateAvatarService;

  beforeEach(() => {
    const module = TestBed.configureTestingModule({
      providers: [
        PlayersService,
        {
          provide: GenerateAvatarService,
          useValue: mock(GenerateAvatarService),
        },
      ],
    });

    underTest = module.inject(PlayersService);
    generateAvatarService = module.inject(GenerateAvatarService);
  });

  describe('clear', () => {
    beforeEach(() => {
      underTest.add({ name: 'Player 1' });
      underTest.add({ name: 'Player 2' });
    });

    it('should clear the players', () => {
      underTest.clear();

      expect(underTest.players()).toBeEmpty();
    });
  });

  describe('remove', () => {
    it('should remove the player', () => {
      const playerName = faker.person.firstName();
      underTest.add({ name: playerName });
      const playerId = underTest
        .players()
        .find(({ name }) => name === playerName)?.id;

      underTest.remove(playerId!);

      expect(underTest.players()).toBeEmpty();
    });

    it('should notify the removal', waitForAsync(() => {
      const expected = 'id';

      underTest.playerRemoved$.subscribe((actual) => {
        expect(actual).toEqual(expected);
      });

      underTest.add({ name: 'player' });

      underTest.remove(expected);
    }));

    describe('when the player id is not found', () => {
      it('should not remove any player', () => {
        underTest.add({ name: 'player-1' });
        underTest.add({ name: 'player-2' });
        underTest.add({ name: 'player-3' });

        underTest.remove(faker.string.alpha(6));

        expect(underTest.players()).toHaveLength(3);
      });
    });
  });

  describe('add', () => {
    it('should add a player', () => {
      underTest.add({ name: 'player' });

      expect(underTest.players()).toHaveLength(1);
    });

    it('should add a player with the given name', () => {
      const expected = faker.person.firstName();

      underTest.add({ name: expected });

      const actual = underTest.players().find(({ name }) => name === expected);

      expect(actual).toBeDefined();
    });

    it('should add a player with a generated avatar uri', () => {
      const expected = 'avatar-uri';

      jest
        .spyOn(generateAvatarService, 'generateAvatarUri')
        .mockReturnValueOnce(expected as any);

      underTest.add({ name: 'player-1' });

      expect(underTest.players().at(0)?.avatarUri).toEqual(expected);
    });

    it('should add a player with an id as the name in lowercase', () => {
      underTest.add({ name: 'Player-Name' });

      expect(underTest.players().at(0)?.id).toBe('player-name');
    });

    it('should notify the addition', waitForAsync(() => {
      let counter = 0;

      underTest.playerAdded$.subscribe(() => {
        counter++;
      });

      const expected = faker.number.int({ max: 10 });

      for (let i = 0; i < expected; i++)
        underTest.add({ name: faker.string.uuid() });

      expect(counter).toEqual(expected);
    }));

    describe('when the player id already exists', () => {
      let currentPlayer: PlayerDto;

      beforeEach(() => {
        const name = faker.person.firstName();
        underTest.add({ name });

        currentPlayer = underTest.players().at(0)!;
      });

      it('should not add a new player', () => {
        const expected = underTest.players();

        underTest.add({ name: currentPlayer.name });
        const actual = underTest.players();

        expect(actual).toEqual(expected);
      });

      it('should notify using the provided name', waitForAsync(() => {
        const expected = currentPlayer.name;

        underTest.playerExists$.subscribe(({ name }) => {
          expect(name).toEqual(expected);
        });

        underTest.add({ name: expected });
      }));
    });
  });

  describe('regenerateAvatar', () => {
    let currentPlayer: PlayerDto;

    beforeEach(() => {
      jest
        .spyOn(generateAvatarService, 'generateAvatarUri')
        .mockReturnValue('first-avatar-uri' as any);

      const name = faker.person.firstName();
      underTest.add({ name });

      currentPlayer = underTest.players().at(0)!;
    });

    it('should regenerate the avatar uri', () => {
      const expected = 'avatar-uri';

      jest
        .spyOn(generateAvatarService, 'generateAvatarUri')
        .mockReturnValueOnce(expected as any);

      underTest.regenerateAvatar(currentPlayer.id);

      const actual = underTest.players().at(0);

      expect(actual?.avatarUri).toEqual(expected);
    });

    describe('when the player id is not found', () => {
      it('should do nothing', () => {
        underTest.regenerateAvatar(faker.string.alpha(6));

        const actual = underTest.players().at(0);

        expect(actual?.avatarUri).toEqual(currentPlayer.avatarUri);
      });
    });
  });
});
