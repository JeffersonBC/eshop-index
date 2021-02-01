import { TestBed, inject } from '@angular/core/testing';

import { GameMediaService } from './game-media.service';

describe('GameMediaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameMediaService]
    });
  });

  it('should be created', inject([GameMediaService], (service: GameMediaService) => {
    expect(service).toBeTruthy();
  }));
});
