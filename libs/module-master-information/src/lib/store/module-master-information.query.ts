import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleMasterInformationState } from './module-master-information.model';
import { ModuleMasterInformationStore } from './module-master-information.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleMasterInformationStoreQuery extends Query<ModuleMasterInformationState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleMasterInformationStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
