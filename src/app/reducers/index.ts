import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { branchDetailsReducer, BranchDetailsState } from './branch-details.reducer';
import { codeReducer, CodeState } from './code.reducer';


export interface State {
  branchDetails:BranchDetailsState
  codeState:CodeState
}

export const reducers: ActionReducerMap<State> = {
  branchDetails:branchDetailsReducer,
  codeState:codeReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
