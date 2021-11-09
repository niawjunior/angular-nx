import { Injectable } from '@angular/core';
import { IRoleResponse } from '@recruit-supplier/api-role';
import { IPageAbleConfig, IPageAbleResponse } from '@recruit-supplier/shared';
import { RequestService } from '@recruit-supplier/utils/http';
import { IUser, IUserResponse } from './api-user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private http: RequestService) {}

  async getUsers(pageAbleConfig: IPageAbleConfig) {
    const { PageNumber, PageSize, keyword } = pageAbleConfig;
    const params = {
      PageNumber: PageNumber,
      PageSize: PageSize,
      search: keyword,
    };

    return await this.http.send<IPageAbleResponse<IUserResponse>>(
      'GET',
      'api/users',
      null,
      {
        ...params,
      }
    );
  }

  async createUser(userFormData: IUser) {
    return await this.http.send('POST', 'api/users', userFormData);
  }

  async getUserById(userId: string) {
    return await this.http.send<IUserResponse>('GET', `api/users/${userId}`);
  }

  async getDepartmentThOptions(keyword?: string, limit?: number) {
    const param = {
      search: keyword,
      limit: limit,
    };
    return await this.http.send<string[]>(
      'GET',
      `api/users/group/departments`,
      null,
      param
    );
  }

  async updateUser(userId: string, userFormData: IUser) {
    return await this.http.send(`PUT`, `api/users/${userId}`, userFormData);
  }

  async deleteUser(userId: string) {
    return await this.http.send('DELETE', `api/users/${userId}`);
  }
}
