import { ITableParams } from '@recruit-supplier/shared';
import { IUserResponse } from '@recruit-supplier/api-user';
import { IRecommendJobPositionListResponse } from '@recruit-supplier/api-recommend-job-position-to-agency';

export interface IConfigAgencyTable extends ITableParams {
  agencies: IUserResponse[];
  keyword: string;
}

export interface IConfigRecommendJobPositionTable extends ITableParams {
  recommendJobPositions: IRecommendJobPositionListResponse[];
  keyword: string;
}
