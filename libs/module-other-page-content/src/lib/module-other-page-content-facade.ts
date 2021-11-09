import { Injectable } from '@angular/core';
import { ModuleOtherPageContentStore } from './store/module-other-page-content.store';
import { ModuleOtherPageContentStoreQuery } from './store/module-other-page-content.query';
import {
  ApiOtherPageContentService,
  IManageOtherPageContent,
  IOtherPageContent,
} from '@recruit-supplier/api-other-page-content';
import { IDropParams } from '@recruit-supplier/shared';

@Injectable({
  providedIn: 'root',
})
export class ModuleOtherPageContentFacade {
  constructor(
    private store: ModuleOtherPageContentStore,
    private storeQuery: ModuleOtherPageContentStoreQuery,
    private apiOtherPageContentService: ApiOtherPageContentService
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

  getOtherPageContents() {
    return this.apiOtherPageContentService.getOtherPageContents();
  }

  getOtherPageContentById(otherPageContentId: string) {
    return this.apiOtherPageContentService.getOtherPageContentById(
      otherPageContentId
    );
  }

  createOtherPageContent(otherPageContentFormData: IOtherPageContent) {
    return this.apiOtherPageContentService.createOtherPageContent(
      otherPageContentFormData
    );
  }

  updateOtherPageContent(
    otherPageContentId: string,
    otherPageContentFormData: IOtherPageContent
  ) {
    return this.apiOtherPageContentService.updateOtherPageContent(
      otherPageContentId,
      otherPageContentFormData
    );
  }

  deleteOtherPageContent(otherPageContentId: string) {
    return this.apiOtherPageContentService.deleteOtherPageContent(
      otherPageContentId
    );
  }

  getManageOtherPageContents(otherPageContentId: string) {
    return this.apiOtherPageContentService.getManageOtherPageContents(
      otherPageContentId
    );
  }

  getManageOtherPageContentById(
    otherPageContentId: string,
    manageOtherPageContentId: string
  ) {
    return this.apiOtherPageContentService.getManageOtherPageContentById(
      otherPageContentId,
      manageOtherPageContentId
    );
  }

  createManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    return this.apiOtherPageContentService.createManageOtherPageContent(
      otherPageContentId,
      manageOtherPageContentFormData
    );
  }

  updateManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentId: string,
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    return this.apiOtherPageContentService.updateManageOtherPageContent(
      otherPageContentId,
      manageOtherPageContentId,
      manageOtherPageContentFormData
    );
  }

  updateManagePageContentPriority(
    otherPageContentId: string,
    params: IDropParams
  ) {
    return this.apiOtherPageContentService.updateManagePageContentPriority(
      otherPageContentId,
      params
    );
  }

  deleteManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentId: string
  ) {
    return this.apiOtherPageContentService.deleteManageOtherPageContent(
      otherPageContentId,
      manageOtherPageContentId
    );
  }
}
