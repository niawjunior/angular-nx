import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleLoginComponent } from './module-login.component';

import { ModuleLoginIndexPageComponent } from './pages/index/index.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleLoginComponent,
    children: [
      {
        path: '',
        component: ModuleLoginIndexPageComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleLandingRoutingModule {}
