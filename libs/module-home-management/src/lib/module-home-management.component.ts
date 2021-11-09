import { Component } from '@angular/core';
import { ModuleHomeManagementFacade } from './module-home-management-facade';

@Component({
  selector: 'recruit-supplier-module-home-management',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleHomeManagementComponent {
  constructor(private facade: ModuleHomeManagementFacade) {
    this.facade.setInitialized();
  }
}
