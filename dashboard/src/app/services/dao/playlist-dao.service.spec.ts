import { TestBed } from '@angular/core/testing';

import { PlaylistDAOService } from './playlist-dao.service';

describe('PlaylistDAOService', () => {
  let service: PlaylistDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
