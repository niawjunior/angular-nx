export interface IOtherPageContentResponse {
  id: string;
  name: string;
  status: 'T' | 'F';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IOtherPageContent = Omit<
  IOtherPageContentResponse,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
};

export interface IManageOtherPageContentResponse {
  id: string;
  priority: number;
  topic: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IManageOtherPageContent = Omit<
  IManageOtherPageContentResponse,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
};
