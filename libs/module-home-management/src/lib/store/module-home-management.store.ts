import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleHomeManagementState } from './module-home-management.model';

export function createInitialState(): ModuleHomeManagementState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-home-management', resettable: true })
export class ModuleHomeManagementStore extends Store<ModuleHomeManagementState> {
  constructor() {
    super(createInitialState());
  }
}
