import { Component } from '@angular/core';
import { ModuleWelfarePageContentFacade } from './module-welfare-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-welfare-page-content',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleWelfarePageContentComponent {
  constructor(private facade: ModuleWelfarePageContentFacade) {
    this.facade.setInitialized();
  }
}
