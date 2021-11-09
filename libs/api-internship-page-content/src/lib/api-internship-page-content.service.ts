import { RequestService } from '@recruit-supplier/utils/http';
import { IDropParams } from '@recruit-supplier/shared';
import {
  IInternshipPageContent,
  IInternshipPageContentResponse,
} from './api-internship-page-content.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiInternshipPageContentService {
  constructor(private http: RequestService) {}

  async getInternshipPageContents() {
    return await this.http.send<IInternshipPageContentResponse[]>(
      `GET`,
      `api/internships`
    );
  }

  async getInternshipPageContentById(internshipContentId: string) {
    return await this.http.send<IInternshipPageContentResponse>(
      `GET`,
      `api/internships/${internshipContentId}`
    );
  }

  async createInternshipPageContent(
    internshipContentFormData: IInternshipPageContent
  ) {
    return await this.http.send(
      'POST',
      `api/internships`,
      internshipContentFormData
    );
  }

  async updateInternshipPageContent(
    internshipContentId: string,
    internshipContentFormData: IInternshipPageContent
  ) {
    return await this.http.send(
      'PUT',
      `api/internships/${internshipContentId}`,
      internshipContentFormData
    );
  }

  async updateInternshipPageContentPriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/internships/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteInternshipPageContentPriority(internshipContentId: string) {
    return await this.http.send(
      'DELETE',
      `api/internships/${internshipContentId}`
    );
  }
}
