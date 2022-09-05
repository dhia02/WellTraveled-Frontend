import { TestBed } from '@angular/core/testing';

import { SalarieGuard } from './salarie.guard';

describe('SalarieGuard', () => {
  let guard: SalarieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalarieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
