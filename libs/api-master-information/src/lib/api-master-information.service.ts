import { Injectable } from '@angular/core';

import { RequestService } from '@recruit-supplier/utils/http';
import {
  IPageAbleConfig,
  IPageAbleResponse,
  IResponseData,
} from '@recruit-supplier/shared';
import {
  IMasterInformationResponse,
  IMasterInformation,
} from './api-master-information.model';
@Injectable({
  providedIn: 'root',
})
export class ApiMasterInformationService {
  constructor(private http: RequestService) {}

  async getMasterInformations(
    pageAbleConfig: IPageAbleConfig,
    masterInformationType: string
  ) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber,
      PageSize,
      search: keyword,
      type: masterInformationType,
    };

    return await this.http.send<IPageAbleResponse<IMasterInformationResponse>>(
      'GET',
      'api/masters',
      null,
      params
    );
  }

  async getMasterInformationById(masterInformationId: string) {
    return await this.http.send<IResponseData<IMasterInformationResponse>>(
      'GET',
      `api/masters/${masterInformationId}`
    );
  }

  async deleteMasterInformation(
    masterInformationId: string,
    masterInformationType: string
  ) {
    const params = {
      type: masterInformationType,
    };
    return await this.http.send(
      'DELETE',
      `api/masters/${masterInformationId}`,
      null,
      params
    );
  }

  async createMasterInformation(
    masterInformationFormData: IMasterInformation,
    masterInformationType: string,
    masterInformationCompany: string
  ) {
    const params = {
      ...masterInformationFormData,
      type: masterInformationType,
      company: masterInformationCompany,
    };
    return await this.http.send('POST', 'api/masters', params);
  }

  async updateMasterInformation(
    masterInformationId: string,
    masterInformationFormData: IMasterInformation,
    masterInformationType: string,
    masterInformationCompany: string
  ) {
    const params = {
      ...masterInformationFormData,
      type: masterInformationType,
      company: masterInformationCompany,
    };

    return await this.http.send(
      'PUT',
      `api/masters/${masterInformationId}`,
      params
    );
  }

  async getMasterInformationTypes() {
    return await this.http.send<IResponseData<string[]>>(
      'GET',
      `api/masters/groups/types`
    );
  }

  async getMasterInformationCompanies() {
    return await this.http.send<IResponseData<string[]>>(
      'GET',
      `api/masters/groups/companies`
    );
  }
}
