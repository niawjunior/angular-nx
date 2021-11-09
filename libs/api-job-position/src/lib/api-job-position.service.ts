import { Injectable } from '@angular/core';

import {
  IDropParams,
  IPageAbleConfig,
  IPageAbleResponse,
  IResponseData,
} from '@recruit-supplier/shared';
import {
  IJobPosition,
  IJobPositionGroupParams,
  IJobPositionResponse,
} from './api-job-position.model';
import { RequestService } from '@recruit-supplier/utils/http';

@Injectable({
  providedIn: 'root',
})
export class ApiJobPositionService {
  constructor(private http: RequestService) {}

  async getJobPositions(pageAbleConfig: IPageAbleConfig, isOpen?: boolean) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber,
      PageSize,
      search: keyword,
      isOpen,
    };

    return await this.http.send<IPageAbleResponse<IJobPositionResponse>>(
      'GET',
      'api/positions',
      null,
      params
    );
  }

  async getJobPositionById(jobPositionId: string) {
    return await this.http.send<IResponseData<IJobPositionResponse>>(
      'GET',
      `api/positions/${jobPositionId}`
    );
  }

  async deleteJobPosition(jobPositionId: string) {
    return await this.http.send('DELETE', `api/positions/${jobPositionId}`);
  }

  async createJobPosition(jobPositionFormData: IJobPosition) {
    return await this.http.send('POST', 'api/positions', jobPositionFormData);
  }

  async updateJobPosition(
    jobPositionId: string,
    jobPositionFormData: IJobPosition
  ) {
    return await this.http.send(
      `PUT`,
      `api/positions/${jobPositionId}`,
      jobPositionFormData
    );
  }

  async getJobPositionGroupByField(groupParams: IJobPositionGroupParams) {
    const param = {
      search: groupParams.keyword,
      limit: groupParams.limit,
    };
    return await this.http.send<IResponseData<string[]>>(
      'GET',
      `api/positions/groups/${groupParams.path}`,
      null,
      param
    );
  }

  async updateJobPositionPriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/positions/${params.fromId}/priority`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }
}
