import { Component } from '@angular/core';
import { ModulePageNotFoundFacade } from './module-page-not-found-facade';

@Component({
  selector: 'recruit-supplier-module-page-not-found',
  template: `<router-outlet></router-outlet>`,
})
export class ModulePageNotFoundComponent {
  constructor(private facade: ModulePageNotFoundFacade) {
    this.facade.setInitialized();
  }
}
