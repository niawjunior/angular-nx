import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleUserState } from './module-user.model';

export function createInitialState(): ModuleUserState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-user', resettable: true })
export class ModuleUserStore extends Store<ModuleUserState> {
  constructor() {
    super(createInitialState());
  }
}
