import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ModuleLoginState } from './module-login.model';

export function createInitialState(): ModuleLoginState {
  return {
    isInitialized: false,
  
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'module-login' })
export class ModuleLoginStore extends Store<ModuleLoginState> {
  constructor() {
    super(createInitialState());
  }
}
