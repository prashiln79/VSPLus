import { Action, createReducer, on } from '@ngrx/store';
import { updatedBranchCommitList, updatedBranchTreeUrl, updatedBranchURL, updatedFileList } from '../action/branch-details.actions';


export const branchDetailsFeatureKey = 'branchDetails';

export interface BranchDetailsState {
  filesList: Array<any>
  commits: Array<any>,
  branchURL:String,
  treeURL:String,
}

export const initialState: BranchDetailsState = {
  filesList: [],
  commits: [],
  branchURL:'',
  treeURL:'',
};


export const branchDetailsReducer = createReducer(
  initialState,
  on(updatedBranchURL, (state, payload: any) => ({ ...state, branchURL: payload.url})),
  on(updatedBranchCommitList, (state, commits: any) => ({ ...state, commits })),
  on(updatedBranchTreeUrl, (state, payload: any) => ({ ...state,treeURL: payload.url})),
  on(updatedFileList, (state, payload: any) => ({ ...state,filesList:payload.tree})),
  
);

