import { Injectable } from '@angular/core';
import { ModuleMasterInformationStore } from './store/module-master-information.store';
import { ModuleMasterInformationStoreQuery } from './store/module-master-information.query';
import {
  ApiMasterInformationService,
  IMasterInformation,
} from '@recruit-supplier/api-master-information';
import { IPageAbleConfig } from '@recruit-supplier/shared';

@Injectable({
  providedIn: 'root',
})
export class ModuleMasterInformationFacade {
  constructor(
    private store: ModuleMasterInformationStore,
    private storeQuery: ModuleMasterInformationStoreQuery,
    private apiMasterInformation: ApiMasterInformationService
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

  getMasterInformations(
    pageAbleConfig: IPageAbleConfig,
    masterInformationType: string
  ) {
    return this.apiMasterInformation.getMasterInformations(
      pageAbleConfig,
      masterInformationType
    );
  }

  getMasterInformationById(masterInformationId: string) {
    return this.apiMasterInformation.getMasterInformationById(
      masterInformationId
    );
  }

  deleteMasterInformation(
    masterInformationId: string,
    masterInformationType: string
  ) {
    return this.apiMasterInformation.deleteMasterInformation(
      masterInformationId,
      masterInformationType
    );
  }

  createMasterInformation(
    masterInformationFormData: IMasterInformation,
    masterInformationType: string,
    masterInformationCompany: string
  ) {
    return this.apiMasterInformation.createMasterInformation(
      masterInformationFormData,
      masterInformationType,
      masterInformationCompany
    );
  }

  updateMasterInformation(
    masterInformationId: string,
    masterInformationFormData: IMasterInformation,
    masterInformationType: string,
    masterInformationCompany: string
  ) {
    return this.apiMasterInformation.updateMasterInformation(
      masterInformationId,
      masterInformationFormData,
      masterInformationType,
      masterInformationCompany
    );
  }

  getMasterInformationTypes() {
    return this.apiMasterInformation.getMasterInformationTypes();
  }

  getMasterInformationCompanies() {
    return this.apiMasterInformation.getMasterInformationCompanies();
  }
}
