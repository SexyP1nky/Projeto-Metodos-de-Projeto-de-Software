import { TestBed } from '@angular/core/testing';

import { PlaylistDAOFactoryService } from './playlist-daofactory.service';

describe('PlaylistDAOFactoryService', () => {
  let service: PlaylistDAOFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistDAOFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
