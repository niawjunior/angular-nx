import { Component } from '@angular/core';
import { ModuleUserFacade } from './module-user-facade';

@Component({
  selector: 'recruit-supplier-module-user',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleUserComponent {
  constructor(private facade: ModuleUserFacade) {
    this.facade.setInitialized();
  }
}
