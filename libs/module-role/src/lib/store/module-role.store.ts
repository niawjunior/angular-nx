import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleRoleState } from './module-role.model';

export function createInitialState(): ModuleRoleState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-role', resettable: true })
export class ModuleRoleStore extends Store<ModuleRoleState> {
  constructor() {
    super(createInitialState());
  }
}
