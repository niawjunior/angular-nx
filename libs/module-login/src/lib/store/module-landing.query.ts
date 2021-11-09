import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ModuleLoginState } from './module-login.model';
import { ModuleLoginStore } from './module-login.store';

@Injectable({
  providedIn: 'root',
})
export class ModuleLandingStoreQuery extends Query<ModuleLoginState> {
  isInitialized$ = this.select('isInitialized');
  constructor(protected store: ModuleLoginStore) {
    super(store);
  }
}
