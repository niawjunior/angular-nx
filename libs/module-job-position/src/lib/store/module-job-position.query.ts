import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleJobPositionState } from './module-job-position.model';
import { ModuleJobPositionStore } from './module-job-position.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleJobPositionStoreQuery extends Query<ModuleJobPositionState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleJobPositionStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
