import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleOtherPageContentState } from './module-other-page-content.model';
import { ModuleOtherPageContentStore } from './module-other-page-content.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleOtherPageContentStoreQuery extends Query<ModuleOtherPageContentState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleOtherPageContentStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
