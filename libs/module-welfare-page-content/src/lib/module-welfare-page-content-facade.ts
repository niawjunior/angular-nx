import { Injectable } from '@angular/core';
import { ModuleWelfarePageContentStore } from './store/module-welfare-page-content.store';
import { ModuleWelfarePageContentStoreQuery } from './store/module-welfare-page-content.query';
import {
  ApiWelfarePageContentService,
  IWelfarePageContent,
} from '@recruit-supplier/api-welfare-page-content';
import { IDropParams } from '@recruit-supplier/shared';
import { ApiUploadFileService } from '@recruit-supplier/api-upload-file';

@Injectable({
  providedIn: 'root',
})
export class ModuleWelfarePageContentFacade {
  constructor(
    private store: ModuleWelfarePageContentStore,
    private storeQuery: ModuleWelfarePageContentStoreQuery,
    private apiWelfarePageContent: ApiWelfarePageContentService,
    private apiUploadFile: ApiUploadFileService
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

  uploadFile(params: FormData) {
    return this.apiUploadFile.uploadFile(params);
  }
  // #region main slide image
  getWelfarePageContents() {
    return this.apiWelfarePageContent.getWelfarePageContents();
  }

  getWelfarePageContentById(welfareContentId: string) {
    return this.apiWelfarePageContent.getWelfarePageContentById(
      welfareContentId
    );
  }

  createWelfarePageContent(welfareContentFormData: IWelfarePageContent) {
    return this.apiWelfarePageContent.createWelfarePageContent(
      welfareContentFormData
    );
  }

  updateWelfarePageContent(
    welfareContentId: string,
    welfareContentFormData: IWelfarePageContent
  ) {
    return this.apiWelfarePageContent.updateWelfarePageContent(
      welfareContentId,
      welfareContentFormData
    );
  }

  updateWelfarePageContentPriority(params: IDropParams) {
    return this.apiWelfarePageContent.updateWelfarePageContentPriority(params);
  }

  deleteWelfarePageContentPriority(welfareContentId: string) {
    return this.apiWelfarePageContent.deleteWelfarePageContentPriority(
      welfareContentId
    );
  }
}
