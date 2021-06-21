import { createAction, props } from '@ngrx/store';

export const updatedBranchURL = createAction(
  '[updatedBranchURL]  BranchDetails',props<{url:String}>()
);

export const updatedBranchTreeUrl = createAction(
  '[updatedBranchTreeUrl]  BranchDetails',props<{url:String}>()
);

export const updatedFileList = createAction(
  '[updatedBranchFileList]  BranchDetails',props<any>()
);

export const updatedBranchCommitList = createAction(
  '[UpdateBranchCommitDetails]  BranchDetails',props<any>()
);

export const BranchCommitDetailsFailure = createAction(
  '[BranchCommitDetails]  BranchDetails Failure',
  props<{ error: any }>()
);

export const updateSubFileList = createAction(
  '[updateSubFileList]  BranchDetails',props<any>()
);



