import { Component } from '@angular/core';
import { ModuleInternshipPageContentFacade } from './module-internship-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-internship-page-content',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleInternshipPageContentComponent {
  constructor(private facade: ModuleInternshipPageContentFacade) {
    this.facade.setInitialized();
  }
}
