import { Injectable } from '@angular/core';
import { ModuleLoginStore } from './store/module-login.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleLoginFacade {
  constructor(
    private store: ModuleLoginStore,

  ) {}

  async verifyUser(companyId: string, userId: string) {
    // call service api
  }

  getVerifyPasswordResponse() {
    return this.store.getValue().isInitialized;
  }
}
