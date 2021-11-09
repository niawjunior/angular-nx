import { Injectable } from '@angular/core';
import { ModuleRecommendJobPositionToAgencyStore } from './store/module-recommend-job-position-to-agency.store';
import { ModuleRecommendJobPositionToAgencyStoreQuery } from './store/module-recommend-job-position-to-agency.query';

import {
  ApiRecommendJobPositionToAgencyService,
  IRecommendJobPosition,
} from '@recruit-supplier/api-recommend-job-position-to-agency';
import { IPageAbleConfig } from '@recruit-supplier/shared';
import { ApiUserService } from '@recruit-supplier/api-user';
import { ApiJobPositionService } from '@recruit-supplier/api-job-position';
@Injectable({
  providedIn: 'root',
})
export class ModuleRecommendJobPositionToAgencyFacade {
  constructor(
    private store: ModuleRecommendJobPositionToAgencyStore,
    private storeQuery: ModuleRecommendJobPositionToAgencyStoreQuery,
    private apiRecommendJobPositionToAgencyService: ApiRecommendJobPositionToAgencyService,
    private apiUserService: ApiUserService,
    private apiJobPositionService: ApiJobPositionService
  ) {}

  setInitialized() {
    this.store.update({ isInitialized: true });
  }

  getLoadStatus() {
    return this.storeQuery.getInitializedStatus();
  }

  resetStore() {
    this.store.reset();
  }

  getAgencies(pageAbleConfig: IPageAbleConfig) {
    return this.apiRecommendJobPositionToAgencyService.getAgencies(
      pageAbleConfig
    );
  }

  getAgencyById(agencyId: string) {
    return this.apiUserService.getUserById(agencyId);
  }

  getRecommendJobPositions(agencyId: string, pageAbleConfig: IPageAbleConfig) {
    return this.apiRecommendJobPositionToAgencyService.getRecommendJobPositions(
      agencyId,
      pageAbleConfig
    );
  }

  getRecommendJobPositionById(
    agencyId: string,
    recommendJobPositionId: string
  ) {
    return this.apiRecommendJobPositionToAgencyService.getRecommendJobPositionById(
      agencyId,
      recommendJobPositionId
    );
  }

  createRecommendJobPosition(
    agencyId: string,
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    return this.apiRecommendJobPositionToAgencyService.createRecommendJobPosition(
      agencyId,
      recommendJobPositionFormData
    );
  }

  updateRecommendJobPosition(
    agencyId: string,
    recommendJobPositionId: string,
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    return this.apiRecommendJobPositionToAgencyService.updateRecommendJobPosition(
      agencyId,
      recommendJobPositionId,
      recommendJobPositionFormData
    );
  }

  deleteRecommendJobPosition(agencyId: string, recommendJobPositionId: string) {
    return this.apiRecommendJobPositionToAgencyService.deleteRecommendJobPosition(
      agencyId,
      recommendJobPositionId
    );
  }

  getJobPositions(pageAbleConfig: IPageAbleConfig) {
    return this.apiJobPositionService.getJobPositions(pageAbleConfig);
  }
}
