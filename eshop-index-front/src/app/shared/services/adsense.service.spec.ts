import { TestBed, inject } from '@angular/core/testing';

import { AdsenseService } from './adsense.service';

describe('AdsenseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdsenseService]
    });
  });

  it('should be created', inject([AdsenseService], (service: AdsenseService) => {
    expect(service).toBeTruthy();
  }));
});
