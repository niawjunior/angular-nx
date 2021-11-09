import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModulePageNotFoundState } from './module-page-not-found.model';
import { ModulePageNotFoundStore } from './module-page-not-found.store';

@Injectable({
  providedIn: 'root',
})
export class ModulePageNotFoundStoreQuery extends Query<ModulePageNotFoundState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModulePageNotFoundStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
