import { TestBed } from '@angular/core/testing';

import { TieneRolGuard } from './tiene-rol.guard';

describe('TieneRolGuard', () => {
  let guard: TieneRolGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TieneRolGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
