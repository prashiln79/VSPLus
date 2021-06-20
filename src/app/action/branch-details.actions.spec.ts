import * as fromBranchDetails from './branch-details.actions';

describe('yBranchDetailss', () => {
  it('should return an action', () => {
    expect(fromBranchDetails.yBranchDetailss().type).toBe('[BranchDetails] Y BranchDetailss');
  });
});
