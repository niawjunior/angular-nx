import { Component, OnDestroy } from '@angular/core';
import { ModuleLoginFacade } from './module-login-facade';

@Component({
  selector: 'recruit-supplier-module-login',
  template: `<router-outlet></router-outlet>`,
})
export class ModuleLoginComponent implements OnDestroy {
  currentLanguage: string;

  constructor(
    private facade: ModuleLoginFacade,
  ) {
  
  }

  ngOnDestroy() {}
}
