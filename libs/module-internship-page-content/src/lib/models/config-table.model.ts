import { ITableParams } from '@recruit-supplier/shared';
import { IInternshipPageContentResponse } from '@recruit-supplier/api-internship-page-content';
export interface IConfigInternshipPageContentTable extends ITableParams {
  internshipPageContents: IInternshipPageContentResponse[];
}
