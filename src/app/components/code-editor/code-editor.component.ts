import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { stopCode, UpdateTerminalOutput } from 'src/app/action/code.actions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {


  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.checkRunButton();
  }

  
  checkRunButton() {
    this.store.select(state => (state.codeState.run))
      .subscribe((data: any) => {
        if (data) {
          let output = '';
          try{
           output = eval(this.code.replace(/console.log/g,'return')) ;
          }catch(e){
            output = e.toString();
          }
          if(output){
            this.store.dispatch(UpdateTerminalOutput({ payLoad: output.toString()}));
          }
          this.store.dispatch(stopCode());
        }
      });
  }


}
