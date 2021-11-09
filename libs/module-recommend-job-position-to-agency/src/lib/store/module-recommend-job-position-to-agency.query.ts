import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleRecommendJobPositionToAgencyState } from './module-recommend-job-position-to-agency.model';
import { ModuleRecommendJobPositionToAgencyStore } from './module-recommend-job-position-to-agency.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleRecommendJobPositionToAgencyStoreQuery extends Query<ModuleRecommendJobPositionToAgencyState> {
  moduleIsLoaded$ = this.select('isInitialized');

  constructor(protected store: ModuleRecommendJobPositionToAgencyStore) {
    super(store);
  }

  getInitializedStatus() {
    return this.store.getValue().isInitialized;
  }
}
