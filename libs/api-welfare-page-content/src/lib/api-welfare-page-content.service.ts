import { Injectable } from '@angular/core';
import { RequestService } from '@recruit-supplier/utils/http';
import { IDropParams } from '@recruit-supplier/shared';
import {
  IWelfarePageContent,
  IWelfarePageContentResponse,
} from './api-welfare-page-content.model';
@Injectable({
  providedIn: 'root',
})
export class ApiWelfarePageContentService {
  constructor(private http: RequestService) {}

  async getWelfarePageContents() {
    return await this.http.send<IWelfarePageContentResponse[]>(
      `GET`,
      `api/welfare/contents`
    );
  }

  async getWelfarePageContentById(welfareContentId: string) {
    return await this.http.send<IWelfarePageContentResponse>(
      `GET`,
      `api/welfare/contents/${welfareContentId}`
    );
  }

  async createWelfarePageContent(welfareContentFormData: IWelfarePageContent) {
    return await this.http.send(
      'POST',
      `api/welfare/contents`,
      welfareContentFormData
    );
  }

  async updateWelfarePageContent(
    welfareContentId: string,
    welfareContentFormData: IWelfarePageContent
  ) {
    return await this.http.send(
      'PUT',
      `api/welfare/contents/${welfareContentId}`,
      welfareContentFormData
    );
  }

  async updateWelfarePageContentPriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/welfare/contents/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteWelfarePageContentPriority(welfareContentId: string) {
    return await this.http.send(
      'DELETE',
      `api/welfare/contents/${welfareContentId}`
    );
  }
}
