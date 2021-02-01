import { TestBed, inject } from '@angular/core/testing';

import { LoginEmitService } from './login-emit.service';

describe('LoginEmitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginEmitService]
    });
  });

  it('should be created', inject([LoginEmitService], (service: LoginEmitService) => {
    expect(service).toBeTruthy();
  }));
});
