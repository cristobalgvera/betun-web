import { TestBed } from '@angular/core/testing';

import { ChooseGameService } from './choose-game.service';

describe('ChooseGameService', () => {
  let service: ChooseGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
