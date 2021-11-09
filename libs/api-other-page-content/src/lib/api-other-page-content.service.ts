import { Injectable } from '@angular/core';
import { IDropParams } from '@recruit-supplier/shared';
import { RequestService } from '@recruit-supplier/utils/http';
import {
  IManageOtherPageContent,
  IManageOtherPageContentResponse,
  IOtherPageContent,
  IOtherPageContentResponse,
} from './api-other-page-content.model';

@Injectable({
  providedIn: 'root',
})
export class ApiOtherPageContentService {
  constructor(private http: RequestService) {}

  async getOtherPageContents() {
    return await this.http.send<IOtherPageContentResponse[]>(
      'GET',
      'api/others',
      null
    );
  }

  async getOtherPageContentById(otherPageContentId: string) {
    return await this.http.send<IOtherPageContentResponse>(
      'GET',
      `api/others/${otherPageContentId}`
    );
  }

  async createOtherPageContent(otherPageContentFormData: IOtherPageContent) {
    return await this.http.send('POST', `api/others`, otherPageContentFormData);
  }

  async updateOtherPageContent(
    otherPageContentId: string,
    otherPageContentFormData: IOtherPageContent
  ) {
    return await this.http.send(
      'PUT',
      `api/others/${otherPageContentId}`,
      otherPageContentFormData
    );
  }

  async deleteOtherPageContent(otherPageContentId: string) {
    return await this.http.send('DELETE', `api/others/${otherPageContentId}`);
  }

  async getManageOtherPageContents(otherPageContentId: string) {
    return await this.http.send<IManageOtherPageContentResponse[]>(
      'GET',
      `api/others/${otherPageContentId}/contents`,
      null
    );
  }

  async getManageOtherPageContentById(
    otherPageContentId: string,
    manageOtherPageContentId: string
  ) {
    return await this.http.send<IManageOtherPageContentResponse>(
      `GET`,
      `api/others/${otherPageContentId}/contents/${manageOtherPageContentId}`
    );
  }

  async createManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    return await this.http.send(
      'POST',
      `api/others/${otherPageContentId}/contents`,
      manageOtherPageContentFormData
    );
  }

  async updateManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentId: string,
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    return await this.http.send(
      'PUT',
      `api/others/${otherPageContentId}/contents/${manageOtherPageContentId}`,
      manageOtherPageContentFormData
    );
  }

  async updateManagePageContentPriority(
    otherPageContentId: string,
    params: IDropParams
  ) {
    return await this.http.send(
      `PUT`,
      `api/others/${otherPageContentId}/contents/change/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteManageOtherPageContent(
    otherPageContentId: string,
    manageOtherPageContentId: string
  ) {
    return await this.http.send(
      'DELETE',
      `api/others/${otherPageContentId}/contents/${manageOtherPageContentId}`
    );
  }
}
