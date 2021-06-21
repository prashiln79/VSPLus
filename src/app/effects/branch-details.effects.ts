import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updatedBranchCommitList, updatedBranchTreeUrl, updatedBranchURL, updatedFileList, updateSubFileList } from '../action/branch-details.actions';
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
          map((data: any) => (updatedFileList({ tree: data.tree }))),
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
          withLatestFrom(this.store.select(state => ({ filesList: state.branchDetails.filesList, path: payLoad.path }))),
          map((data: any) => {
            let newList = (data[1]['filesList']).filter((elem:any)=>{

              if(elem.path != data[1]['path'] ){
                return true;
              }else{
                return false;
              }
            });

            for (let k in data[0]['tree']) {
              let elem = data[0]['tree'][k]
              elem['path'] = data[1]['path'] + '/' + data[0]['tree'][k]['path']
              newList = newList.concat([elem]);
            }

            // }
            return updatedFileList({ tree: newList });
          }),
          catchError(() => of({ type: '[BranchCommitDetails]  BranchCommitDetails Failure' }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<State>) {

  }

}
