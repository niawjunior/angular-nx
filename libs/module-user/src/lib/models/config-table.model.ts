import { IRoleResponse } from '@recruit-supplier/api-role';
import { IUserResponse } from '@recruit-supplier/api-user';
import { ITableParams } from '@recruit-supplier/shared';
export interface IConfigUserTable extends ITableParams {
  users: IUserResponse[];
  keyword: string;
  selectedType: string;
  rolesOptions: IRoleResponse[];
}
