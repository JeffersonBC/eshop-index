import { TestBed, inject } from '@angular/core/testing';

import { RecomendationService } from './recomendation.service';

describe('RecomendationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecomendationService]
    });
  });

  it('should be created', inject([RecomendationService], (service: RecomendationService) => {
    expect(service).toBeTruthy();
  }));
});
