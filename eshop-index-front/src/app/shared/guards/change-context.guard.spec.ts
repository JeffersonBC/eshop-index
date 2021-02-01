import { TestBed, async, inject } from '@angular/core/testing';

import { ChangeContextGuard } from './change-context.guard';

describe('ChangeContextGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeContextGuard]
    });
  });

  it('should ...', inject([ChangeContextGuard], (guard: ChangeContextGuard) => {
    expect(guard).toBeTruthy();
  }));
});
