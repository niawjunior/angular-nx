import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleJobPositionState } from './module-job-position.model';

export function createInitialState(): ModuleJobPositionState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-job-position', resettable: true })
export class ModuleJobPositionStore extends Store<ModuleJobPositionState> {
  constructor() {
    super(createInitialState());
  }
}
