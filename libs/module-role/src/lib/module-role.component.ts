import { Component } from '@angular/core';
import { ModuleRoleFacade } from './module-role-facade';

@Component({
  selector: 'recruit-supplier-module-role',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleRoleComponent {
  constructor(private facade: ModuleRoleFacade) {
    this.facade.setInitialized();
  }
}
