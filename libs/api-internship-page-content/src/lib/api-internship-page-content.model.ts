export interface IInternshipPageContentResponse {
  id: string;
  topic: string;
  priority: number;
  content: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IInternshipPageContent = Omit<
  IInternshipPageContentResponse,
  'id' | 'priority' | 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'
> & {
  id?: string;
};
