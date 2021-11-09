import { Component, OnDestroy } from '@angular/core';
import { ModuleJobPositionFacade } from './module-job-position-facade';

@Component({
  selector: 'recruit-supplier-module-job-position',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleJobPositionComponent implements OnDestroy {
  constructor(private facade: ModuleJobPositionFacade) {
    this.facade.setInitialized();
  }

  ngOnDestroy() {}
}
