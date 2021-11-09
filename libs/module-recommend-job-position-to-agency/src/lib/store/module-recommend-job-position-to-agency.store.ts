import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { ModuleRecommendJobPositionToAgencyState } from './module-recommend-job-position-to-agency.model';

export function createInitialState(): ModuleRecommendJobPositionToAgencyState {
  return {
    isInitialized: false,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-recommend-job-position-to-agency', resettable: true })
export class ModuleRecommendJobPositionToAgencyStore extends Store<ModuleRecommendJobPositionToAgencyState> {
  constructor() {
    super(createInitialState());
  }
}
