import { IJobPositionResponse } from '@recruit-supplier/api-job-position';

export interface IRecommendJobPositionResponse {
  id: string;
  jobPosition: IJobPositionResponse;
  startReachDate: Date;
  endReachDate: Date;
  startApplyDate: Date;
  endApplyDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecommendJobPositionListResponse
  extends IRecommendJobPositionResponse {
  amountCandidate: number;
}

export type IRecommendJobPosition = Omit<
  IRecommendJobPositionResponse,
  'id' | 'updatedAt' | 'createdAt' | 'jobPosition'
> & {
  jobPositionId: string;
};
