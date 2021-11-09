import { Component } from '@angular/core';
import { ModuleRecommendJobPositionToAgencyFacade } from './module-recommend-job-position-to-agency-facade';

@Component({
  selector: 'recruit-supplier-module-recommend-job-position-to-agency',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleRecommendJobPositionToAgencyComponent {
  constructor(private facade: ModuleRecommendJobPositionToAgencyFacade) {
    this.facade.setInitialized();
  }
}
