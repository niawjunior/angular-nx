import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleWelfarePageContentState } from './module-welfare-page-content.model';
import { ModuleWelfarePageContentStore } from './module-welfare-page-content.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleWelfarePageContentStoreQuery extends Query<ModuleWelfarePageContentState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleWelfarePageContentStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
