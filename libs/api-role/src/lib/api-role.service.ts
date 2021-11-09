import { Injectable } from '@angular/core';
import { RequestService } from '@recruit-supplier/utils/http';
import { IPageAbleConfig, IPageAbleResponse } from '@recruit-supplier/shared';
import { IRole, IRoleResponse } from './api-role.model';

@Injectable({
  providedIn: 'root',
})
export class ApiRoleService {
  constructor(private http: RequestService) {}

  async getRoles(pageAbleConfig: IPageAbleConfig = {} as IPageAbleConfig) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber: PageNumber,
      PageSize: PageSize,
      search: keyword,
    };

    return await this.http.send<IPageAbleResponse<IRoleResponse>>(
      'GET',
      'api/roles',
      null,
      {
        ...params,
      }
    );
  }

  async createRole(roleFormData: IRole) {
    return await this.http.send('POST', 'api/roles', roleFormData);
  }

  async getRoleById(roleId: string) {
    return await this.http.send<IRoleResponse>('GET', `api/roles/${roleId}`);
  }

  async updateRole(roleId: string, roleFormData: IRole) {
    return await this.http.send(`PUT`, `api/roles/${roleId}`, roleFormData);
  }

  async deleteRole(roleId: string) {
    return await this.http.send('DELETE', `api/roles/${roleId}`);
  }
}
