import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleMasterInformationState } from './module-master-information.model';

export function createInitialState(): ModuleMasterInformationState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-master-information', resettable: true })
export class ModuleMasterInformationStore extends Store<ModuleMasterInformationState> {
  constructor() {
    super(createInitialState());
  }
}
