import { Injectable } from '@angular/core';
import { ApiUserService, IUser } from '@recruit-supplier/api-user';
import { ModuleUserStore } from './store/module-user.store';
import { ModuleUserStoreQuery } from './store/module-user.query';
import { IPageAbleConfig } from '@recruit-supplier/shared';
import { ApiRoleService, IRoleResponse } from '@recruit-supplier/api-role';

@Injectable({
  providedIn: 'root',
})
export class ModuleUserFacade {
  constructor(
    private store: ModuleUserStore,
    private storeQuery: ModuleUserStoreQuery,
    private apiUser: ApiUserService,
    private apiRole: ApiRoleService
  ) {}

  setInitialized() {
    this.store.update({ isInitialized: true });
  }

  getLoadStatus() {
    return this.storeQuery.getInitializedStatus();
  }

  resetStore() {
    this.store.reset();
  }

  async getRoles(): Promise<IRoleResponse[]> {
    const getRoles = await this.apiRole.getRoles();
    const roleMapping = getRoles.data.map((item) => {
      return {
        id: item.id,
        roleName: item.roleName,
      };
    });
    return roleMapping;
  }

  getUsers(pageAbleConfig: IPageAbleConfig) {
    return this.apiUser.getUsers(pageAbleConfig);
  }
  getDepartmentThOptions(keyword?: string, limit?: number) {
    return this.apiUser.getDepartmentThOptions(keyword, limit);
  }

  createUser(userFormData: IUser) {
    return this.apiUser.createUser(userFormData);
  }

  getUserById(userId: string) {
    return this.apiUser.getUserById(userId);
  }

  updateUser(userId: string, userFormData: IUser) {
    return this.apiUser.updateUser(userId, userFormData);
  }

  deleteUser(userId: string) {
    return this.apiUser.deleteUser(userId);
  }
}
