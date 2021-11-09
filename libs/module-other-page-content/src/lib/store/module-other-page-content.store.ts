import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleOtherPageContentState } from './module-other-page-content.model';

export function createInitialState(): ModuleOtherPageContentState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-other-page-content', resettable: true })
export class ModuleOtherPageContentStore extends Store<ModuleOtherPageContentState> {
  constructor() {
    super(createInitialState());
  }
}
