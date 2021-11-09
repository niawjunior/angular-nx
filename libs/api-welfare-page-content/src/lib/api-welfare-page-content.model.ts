export interface IWelfarePageContentResponse {
  id: string;
  topic: string;
  image: string;
  priority: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IWelfarePageContent = Omit<
  IWelfarePageContentResponse,
  'id' | 'createdAt' | 'updatedAt'
>;
