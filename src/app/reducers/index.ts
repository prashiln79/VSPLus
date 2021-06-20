import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { branchDetailsReducer, BranchDetailsState } from './branch-details.reducer';


export interface State {
  branchDetails:BranchDetailsState
}

export const reducers: ActionReducerMap<State> = {
  branchDetails:branchDetailsReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
