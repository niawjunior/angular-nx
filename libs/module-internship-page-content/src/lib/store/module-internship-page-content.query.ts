import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleInternshipPageContentState } from './module-internship-page-content.model';
import { ModuleInternshipPageContentStore } from './module-internship-page-content.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleInternshipPageContentStoreQuery extends Query<ModuleInternshipPageContentState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleInternshipPageContentStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
