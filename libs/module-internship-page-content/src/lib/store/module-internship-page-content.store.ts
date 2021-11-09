import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleInternshipPageContentState } from './module-internship-page-content.model';

export function createInitialState(): ModuleInternshipPageContentState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-internship-page-content', resettable: true })
export class ModuleInternshipPageContentStore extends Store<ModuleInternshipPageContentState> {
  constructor() {
    super(createInitialState());
  }
}
