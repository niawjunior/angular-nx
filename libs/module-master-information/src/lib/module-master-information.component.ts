import { Component } from '@angular/core';
import { ModuleMasterInformationFacade } from './module-master-information-facade';

@Component({
  selector: 'recruit-supplier-module-master-information',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleMasterInformationComponent {
  constructor(private facade: ModuleMasterInformationFacade) {
    this.facade.setInitialized();
  }
}
