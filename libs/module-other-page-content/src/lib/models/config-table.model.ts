import {
  IManageOtherPageContentResponse,
  IOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { ITableParams } from '@recruit-supplier/shared';

export interface IConfigManageOtherPageContent extends ITableParams {
  manageOtherPageContents: IManageOtherPageContentResponse[];
}

export interface IConfigOtherPageContent extends ITableParams {
  otherPageContents: IOtherPageContentResponse[];
}
