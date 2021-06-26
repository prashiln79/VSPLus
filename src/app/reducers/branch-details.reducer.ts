import { Action, createReducer, on } from '@ngrx/store';
import { BranchCommitDetailsFailure, subBranchFileListFailure, updatedBranchCommitList, updatedBranchTreeUrl, updatedBranchURL, updatedFileList } from '../action/branch-details.actions';


export const branchDetailsFeatureKey = 'branchDetails';

export interface BranchDetailsState {
  filesList: Array<any>
  commits: Array<any>,
  branchURL: String,
  treeURL: String,
  subBranchRetrievalFailure: boolean
}

export const initialState: BranchDetailsState = {
  filesList: [],
  commits: [],
  branchURL: '',
  treeURL: '',
  subBranchRetrievalFailure: false,
};


export const branchDetailsReducer = createReducer(
  initialState,
  on(updatedBranchURL, (state, payload: any) => ({ ...state, branchURL: payload.url })),
  on(updatedBranchCommitList, (state, commits: any) => ({ ...state, commits })),
  on(updatedBranchTreeUrl, (state, payload: any) => ({ ...state, treeURL: payload.url })),
  on(updatedFileList, (state, payload: any) => ({ ...state, filesList: payload.tree })),
  on(subBranchFileListFailure, (state) => ({ ...state, subBranchRetrievalFailure: true })),
  on(BranchCommitDetailsFailure, (state) => ({ ...state, subBranchRetrievalFailure: true })),


);

