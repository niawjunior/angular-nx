import { Injectable } from '@angular/core';
import { ModuleRoleStore } from './store/module-role.store';
import { ModuleRoleStoreQuery } from './store/module-role.query';
import { IPageAbleConfig } from '@recruit-supplier/shared';
import { ApiRoleService, IRole } from '@recruit-supplier/api-role';
@Injectable({
  providedIn: 'root',
})
export class ModuleRoleFacade {
  constructor(
    private store: ModuleRoleStore,
    private storeQuery: ModuleRoleStoreQuery,
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

  getRoles(pageAbleConfig: IPageAbleConfig) {
    return this.apiRole.getRoles(pageAbleConfig);
  }

  createRole(roleFormData: IRole) {
    return this.apiRole.createRole(roleFormData);
  }

  getRoleById(roleId: string) {
    return this.apiRole.getRoleById(roleId);
  }

  updateRole(roleId: string, roleFormData: IRole) {
    return this.apiRole.updateRole(roleId, roleFormData);
  }

  deleteRole(roleId: string) {
    return this.apiRole.deleteRole(roleId);
  }
}
