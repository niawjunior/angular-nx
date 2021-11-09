import { ITableParams } from '@recruit-supplier/shared';
import { IMasterInformationResponse } from '@recruit-supplier/api-master-information';

export interface IConfigMasterInformationTable extends ITableParams {
  masterInformationTypes: string[];
  masterInformationCompanies: string[];
  selectedType: string;
  selectedCompany: string;
  masterInformations: IMasterInformationResponse[];
  keyword: string;
}
