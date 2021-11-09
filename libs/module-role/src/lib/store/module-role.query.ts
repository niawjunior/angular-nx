import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleRoleState } from './module-role.model';
import { ModuleRoleStore } from './module-role.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleRoleStoreQuery extends Query<ModuleRoleState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleRoleStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
