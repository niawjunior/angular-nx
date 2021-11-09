import { Injectable } from '@angular/core';
import { ModulePageNotFoundStore } from './store/module-page-not-found.store';
import { ModulePageNotFoundStoreQuery } from './store/module-page-not-found.query';

@Injectable({
  providedIn: 'root',
})
export class ModulePageNotFoundFacade {
  constructor(private store: ModulePageNotFoundStore, private storeQuery: ModulePageNotFoundStoreQuery) {}

  setInitialized() {
    this.store.update({ isInitialized: true });
  }

  getLoadStatus() {
    return this.storeQuery.getInitializedStatus();
  }

  resetStore() {
    this.store.reset();
  }
}
