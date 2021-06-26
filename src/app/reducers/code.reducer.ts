import { Action, createReducer, on } from '@ngrx/store';
import { runCode, stopCode, UpdateTerminalOutput } from '../action/code.actions';


export const codeFeatureKey = 'code';

export interface CodeState {
  run: Boolean,
  code: String
}

export const initialState: CodeState = {
  run: false,
  code: '',
};


export const codeReducer = createReducer(
  initialState,
  on(runCode, (state) => ({ ...state, run: true })),
  on(stopCode, (state) => ({ ...state, run: false })),
  on(UpdateTerminalOutput, (state,data:any) => ({ ...state, code: data.payLoad })),


);

