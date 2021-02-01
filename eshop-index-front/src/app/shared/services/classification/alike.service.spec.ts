import { TestBed, inject } from '@angular/core/testing';

import { AlikeService } from './alike.service';

describe('AlikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlikeService]
    });
  });

  it('should be created', inject([AlikeService], (service: AlikeService) => {
    expect(service).toBeTruthy();
  }));
});
