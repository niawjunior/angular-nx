export interface IJobPositionResponse {
  id: string;
  priority: number;
  name: string;
  description: string;
  address?: string;
  tag?: string;
  startDate: Date;
  endDate?: Date;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IJobPosition = Omit<
  IJobPositionResponse,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;


export interface IJobPositionGroupParams {
  path: string;
  keyword: string;
  limit: number
}