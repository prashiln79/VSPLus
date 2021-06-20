import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BranchDetailsEffects } from './branch-details.effects';

describe('BranchDetailsEffects', () => {
  let actions$: Observable<any>;
  let effects: BranchDetailsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BranchDetailsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BranchDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
