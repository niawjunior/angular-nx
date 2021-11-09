import { Injectable } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { ModuleInternshipPageContentStore } from './store/module-internship-page-content.store';
import { ModuleInternshipPageContentStoreQuery } from './store/module-internship-page-content.query';
import {
  ApiInternshipPageContentService,
  IInternshipPageContent,
} from '@recruit-supplier/api-internship-page-content';

@Injectable({
  providedIn: 'root',
})
export class ModuleInternshipPageContentFacade {
  constructor(
    private store: ModuleInternshipPageContentStore,
    private storeQuery: ModuleInternshipPageContentStoreQuery,
    private apiInternshipPageContent: ApiInternshipPageContentService
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

  // #region main slide image
  getInternshipPageContents() {
    return this.apiInternshipPageContent.getInternshipPageContents();
  }

  getInternshipPageContentById(internshipContentId: string) {
    return this.apiInternshipPageContent.getInternshipPageContentById(
      internshipContentId
    );
  }

  createInternshipPageContent(
    internshipContentFormData: IInternshipPageContent
  ) {
    return this.apiInternshipPageContent.createInternshipPageContent(
      internshipContentFormData
    );
  }

  updateInternshipPageContent(
    internshipContentId: string,
    internshipContentFormData: IInternshipPageContent
  ) {
    return this.apiInternshipPageContent.updateInternshipPageContent(
      internshipContentId,
      internshipContentFormData
    );
  }

  updateInternshipPageContentPriority(params: IDropParams) {
    return this.apiInternshipPageContent.updateInternshipPageContentPriority(
      params
    );
  }

  deleteInternshipPageContentPriority(internshipContentId: string) {
    return this.apiInternshipPageContent.deleteInternshipPageContentPriority(
      internshipContentId
    );
  }
}
