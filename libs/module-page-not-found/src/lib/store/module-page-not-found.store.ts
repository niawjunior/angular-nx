import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModulePageNotFoundState } from './module-page-not-found.model';

export function createInitialState(): ModulePageNotFoundState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-page-not-found', resettable: true })
export class ModulePageNotFoundStore extends Store<ModulePageNotFoundState> {
  constructor() {
    super(createInitialState());
  }
}
