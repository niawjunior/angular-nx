import { Injectable } from '@angular/core';
import { ModuleJobPositionStore } from './store/module-job-position.store';
import { ModuleJobPositionStoreQuery } from './store/module-job-position.query';
import {
  ApiJobPositionService,
  IJobPosition,
  IJobPositionGroupParams,
} from '@recruit-supplier/api-job-position';
import { IDropParams, IPageAbleConfig } from '@recruit-supplier/shared';

@Injectable({
  providedIn: 'root',
})
export class ModuleJobPositionFacade {
  constructor(
    private store: ModuleJobPositionStore,
    private storeQuery: ModuleJobPositionStoreQuery,
    private apiJobPosition: ApiJobPositionService
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

  getJobPositions(pageAbleConfig: IPageAbleConfig, isOpen?: boolean) {
    return this.apiJobPosition.getJobPositions(pageAbleConfig, isOpen);
  }

  getJobPositionById(jobPositionId: string) {
    return this.apiJobPosition.getJobPositionById(jobPositionId);
  }

  getJobPositionGroupByField(params: IJobPositionGroupParams) {
    return this.apiJobPosition.getJobPositionGroupByField(params);
  }

  deleteJobPosition(jobPositionId: string) {
    return this.apiJobPosition.deleteJobPosition(jobPositionId);
  }

  createJobPosition(jobPositionFormData: IJobPosition) {
    return this.apiJobPosition.createJobPosition(jobPositionFormData);
  }

  updateJobPosition(jobPositionId: string, jobPositionFormData: IJobPosition) {
    return this.apiJobPosition.updateJobPosition(
      jobPositionId,
      jobPositionFormData
    );
  }

 updateJobPositionPriority(params: IDropParams){
    return this.apiJobPosition.updateJobPositionPriority(params)
  }
}
