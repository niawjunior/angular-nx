import { Component } from '@angular/core';
import { ModuleOtherPageContentFacade } from './module-other-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-other-page-content',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleOtherPageContentComponent {
  constructor(private facade: ModuleOtherPageContentFacade) {
    this.facade.setInitialized();
  }
}
