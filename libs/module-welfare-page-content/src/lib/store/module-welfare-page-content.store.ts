import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleWelfarePageContentState } from './module-welfare-page-content.model';

export function createInitialState(): ModuleWelfarePageContentState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-welfare-page-content', resettable: true })
export class ModuleWelfarePageContentStore extends Store<ModuleWelfarePageContentState> {
  constructor() {
    super(createInitialState());
  }
}
