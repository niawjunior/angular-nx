import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleHomeManagementState } from './module-home-management.model';
import { ModuleHomeManagementStore } from './module-home-management.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleHomeManagementStoreQuery extends Query<ModuleHomeManagementState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleHomeManagementStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
