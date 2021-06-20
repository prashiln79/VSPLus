import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updatedBranchCommitList, updatedBranchTree, updatedBranchTreeUrl, updatedBranchURL, updatedFileList, updateSubFileList } from '../action/branch-details.actions';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from '../reducers';



@Injectable()
export class BranchDetailsEffects {



  getAllCommitsFormThebranchURL$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatedBranchURL.type),
      mergeMap((payLoad: any) => this.httpClient.get(payLoad.url + '/commits')
        .pipe(
          map(data => (updatedBranchCommitList(data))),
          catchError(() => of({ type: '[BranchCommitDetails]  BranchCommitDetails Failure' }))
        )
      )
    )
  );

  getFileListFormThebranchTreeURL$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatedBranchTreeUrl.type),
      mergeMap((payLoad: any) => this.httpClient.get(payLoad.url)
        .pipe(
          map(data => (updatedBranchTree(data))),
          catchError(() => of({ type: '[BranchCommitDetails]  BranchCommitDetails Failure' }))
        )
      )
    )
  );

  updateSubtree$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateSubFileList.type),
    mergeMap((payLoad: any) => this.httpClient.get(payLoad.url)
      .pipe(
        withLatestFrom(this.store.select(state => (state.branchDetails.filesList))),
        map((data:any) => {
          let newList = [];
          for(let k in data[1]){
            if(data[1][k].sha && data[1][k].sha == data[0].sha){
                       newList.push(Object.assign({},data[1][k],{'children':data[0]})  );
            }else{
                   newList.push(  data[1][k]);
               }
           
           }
          return updatedFileList(newList);
        }),
        catchError(() => of({ type: '[BranchCommitDetails]  BranchCommitDetails Failure' }))
      )
    )
  )
);

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<State>) {

  }

}
