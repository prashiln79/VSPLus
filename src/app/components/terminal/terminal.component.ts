import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'javascript',lineNumbers:'off'};
  code: string= 'output';

  constructor() { }

  ngOnInit(): void {
  }

}
