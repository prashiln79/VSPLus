import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  editorOptions = { theme: 'vs-dark', language: 'text', lineNumbers: 'off' };
  code: string = 'Hello world!';

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.getTerminalOutput();
  }

  getTerminalOutput() {
    this.store.select(state => (state.codeState.code))
      .subscribe((data: any) => {
        if (data) {
          this.code = data;
        }
      });
  }

}
