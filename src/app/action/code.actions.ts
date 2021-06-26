import { createAction, props } from '@ngrx/store';

export const runCode = createAction(
  '[runCode] run code'
);

export const stopCode = createAction(
  '[stopCode] stop code'
);

export const UpdateTerminalOutput = createAction(
  '[UpdateTerminalOutput] update code output', props<any>()
);

