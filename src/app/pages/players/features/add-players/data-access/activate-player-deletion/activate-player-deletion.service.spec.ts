import { TestBed } from '@angular/core/testing';

import { ActivatePlayerDeletionService } from './activate-player-deletion.service';

describe('ActivatePlayerDeletionService', () => {
  let service: ActivatePlayerDeletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivatePlayerDeletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
