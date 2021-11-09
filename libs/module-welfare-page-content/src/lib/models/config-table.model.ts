import { ITableParams } from '@recruit-supplier/shared';
import { IWelfarePageContentResponse } from '@recruit-supplier/api-welfare-page-content';
export interface IConfigWelfarePageContentTable extends ITableParams {
  welfarePageContents: IWelfarePageContentResponse[];
}
