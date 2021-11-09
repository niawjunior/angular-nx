import { Injectable } from '@angular/core';

import { IPageAbleConfig, IPageAbleResponse } from '@recruit-supplier/shared';
import { RequestService } from '@recruit-supplier/utils/http';
import {
  IRecommendJobPositionResponse,
  IRecommendJobPositionListResponse,
  IRecommendJobPosition,
} from './api-recommend-job-position-to-agency.model';
import { IUserResponse } from '@recruit-supplier/api-user';

@Injectable({
  providedIn: 'root',
})
export class ApiRecommendJobPositionToAgencyService {
  constructor(private http: RequestService) {}

  async getAgencies(pageAbleConfig: IPageAbleConfig) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber,
      PageSize,
      search: keyword,
    };
    return await this.http.send<IPageAbleResponse<IUserResponse>>(
      'GET',
      'api/agencies',
      null,
      params
    );
  }

  async getRecommendJobPositions(
    agencyId: string,
    pageAbleConfig: IPageAbleConfig
  ) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber,
      PageSize,
      search: keyword,
    };
    return await this.http.send<
      IPageAbleResponse<IRecommendJobPositionListResponse>
    >('GET', `api/agencies/${agencyId}/recommend-job-positions`, null, params);
  }

  async getRecommendJobPositionById(
    agencyId: string,
    recommendJobPositionId: string
  ) {
    return await this.http.send<IRecommendJobPositionResponse>(
      `GET`,
      `api/agencies/${agencyId}/recommend-job-positions/${recommendJobPositionId}`
    );
  }

  async createRecommendJobPosition(
    agencyId: string,
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    return await this.http.send(
      'POST',
      `api/agencies/${agencyId}/recommend-job-positions`,
      recommendJobPositionFormData
    );
  }

  async updateRecommendJobPosition(
    agencyId: string,
    recommendJobPositionId: string,
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    return await this.http.send(
      'PUT',
      `api/agencies/${agencyId}/recommend-job-positions/${recommendJobPositionId}`,
      recommendJobPositionFormData
    );
  }

  async deleteRecommendJobPosition(
    agencyId: string,
    recommendJobPositionId: string
  ) {
    return await this.http.send(
      'DELETE',
      `api/agencies/${agencyId}/recommend-job-positions/${recommendJobPositionId}`
    );
  }
}
