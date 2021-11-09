import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { GlobalState } from './session.model';

export function createInitialState(): GlobalState {
  return {
    isInitialized: false,
    pageLayout: {
      breadcrumbs: [],
      activeMenu: undefined,
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'global-store', resettable: true })
export class GlobalStore extends Store<GlobalState> {
  constructor() {
    super(createInitialState());
  }
}
