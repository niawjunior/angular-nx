import { IJobPositionResponse } from '@recruit-supplier/api-job-position';
import { ITableParams } from '@recruit-supplier/shared';

export interface IConfigJobPositionTable extends ITableParams {
  jobPositions: IJobPositionResponse[];
  isOpen: boolean;
  keyword: string;
}