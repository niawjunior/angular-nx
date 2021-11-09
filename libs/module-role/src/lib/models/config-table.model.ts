import { IRoleResponse } from '@recruit-supplier/api-role';
import { ITableParams } from '@recruit-supplier/shared';
export interface IConfigRoleTable extends ITableParams {
  roles: IRoleResponse[];
  keyword: string;
}
