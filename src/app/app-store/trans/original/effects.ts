import { Injectable, Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, mergeMap, mergeMapTo, concatMap, mapTo, concatAll, tap } from 'rxjs/operators';
import { of, concat, merge } from 'rxjs';

import { DATA_SERVICE } from '../../../services/injection-tokens';
import { IDataService } from '../../../services/data.service';
import { StoreActions } from './actions';
import { ESources, ITranslateOriginalEntity } from '../../../types/trans';
import { Store } from '@ngrx/store';
import { IAppState } from '../../app-store.module';
import { StoreActions as StatusActions, EOriginalStatus } from '../original-status/actions';

@Injectable()
export class TranslateOriginalEffects {


  @Effect()
  loadOriginal$ = this.actions$.pipe(
    ofType<StoreActions.originalLoad>(StoreActions.Types.ORIGINAL_LOAD),
    tap((action: StoreActions.originalLoad) => this.store.dispatch(
      new StatusActions.statusSet(action.entityId, EOriginalStatus.ORIGINAL_LOAD))
    ),
    switchMap((action: StoreActions.originalLoad) => {
      return this.data.getItem(ESources.SOURCE, action.entityId).pipe(
        map((entity: ITranslateOriginalEntity) => new StoreActions.originalLoadSuccess(entity)),
        catchError(() => of(new StoreActions.originalLoadError(action.entityId))),
      )
    })
  );

  // ,
  constructor(
    private store: Store<IAppState>,
    private actions$: Actions<StoreActions.Actions>,
    @Inject(DATA_SERVICE) private data: IDataService
  ) {

  }

}
