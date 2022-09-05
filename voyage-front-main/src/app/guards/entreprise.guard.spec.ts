import { TestBed } from '@angular/core/testing';

import { EntrepriseGuard } from './entreprise.guard';

describe('EntrepriseGuard', () => {
  let guard: EntrepriseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EntrepriseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
