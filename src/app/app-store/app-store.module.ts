import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreState as MenuMain } from '@app-library/menu-main/store';


import { StoreState as Translate } from '@app-store/trans/translate';
import { StoreState as SyncState } from '@app-store/trans/sync-state';
import { StoreState as User } from '@app-library/user/store';

import { TransStoreModule } from '@app-store/trans/trans-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuMainStateModule } from '@app-library/menu-main/store/module';


export interface IAppState {
  MENU_MAIN: MenuMain.State,
  ENTITY_TRANSLATE: Translate.State,
  SYNCS_TATE: SyncState.State,
  USER: User.State,
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    MenuMainStateModule,
    TransStoreModule
  ]
})
export class AppStoreModule { }
