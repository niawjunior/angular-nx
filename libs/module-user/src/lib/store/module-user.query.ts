import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleUserState } from './module-user.model';
import { ModuleUserStore } from './module-user.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleUserStoreQuery extends Query<ModuleUserState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleUserStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
