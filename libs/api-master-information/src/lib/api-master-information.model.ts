export interface IMasterInformationResponse {
  id: string;
  isActive: boolean;
  code: string;
  company: string;
  nameEn: string;
  nameTh: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IMasterInformation = Omit<
  IMasterInformationResponse,
  'id' | 'createdAt' | 'updatedAt'
>;
