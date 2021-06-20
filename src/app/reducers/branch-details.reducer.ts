import { Action, createReducer, on } from '@ngrx/store';
import { updatedBranchCommitList, updatedBranchTree, updatedBranchTreeUrl, updatedBranchURL, updatedFileList } from '../action/branch-details.actions';


export const branchDetailsFeatureKey = 'branchDetails';

export interface BranchDetailsState {
  filesList: Array<any>
  commits: Array<any>,
  branchURL:String,
  treeURL:String,
  tree:Array<any>
}

export const initialState: BranchDetailsState = {
  filesList: [],
  commits: [],
  branchURL:'',
  treeURL:'',
  tree:[],
};


export const branchDetailsReducer = createReducer(
  initialState,
  on(updatedBranchURL, (state, payload: any) => ({ ...state, branchURL: payload.url})),
  on(updatedBranchCommitList, (state, commits: any) => ({ ...state, commits })),
  on(updatedBranchTreeUrl, (state, payload: any) => ({ ...state,treeURL: payload.url})),
  on(updatedBranchTree, (state, payload: any) => ({ ...state,tree:payload.tree})),
  on(updatedFileList, (state, filesList: any) => ({ ...state,filesList})),
  
);

