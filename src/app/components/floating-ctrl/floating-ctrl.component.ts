import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { runCode } from 'src/app/action/code.actions';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-floating-ctrl',
  templateUrl: './floating-ctrl.component.html',
  styleUrls: ['./floating-ctrl.component.scss']
})
export class FloatingCtrlComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit(): void {


  }

  run(){
    this.store.dispatch(runCode());
  }

}
