import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleJobPositionComponent } from './module-job-position.component';
import { ModuleJobPositionIndexPageComponent } from './pages/index/index.page';
import { ModuleJobPositionCreatePageComponent } from './pages/create/create.page';
import { ModuleJobPositionUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleJobPositionComponent,
    children: [
      {
        path: '',
        component: ModuleJobPositionIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleJobPositionCreatePageComponent,
      },
      {
        path: `:jobPositionId/${EPageRoute.UPDATE}`,
        component: ModuleJobPositionUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleJobPositionRoutingModule {}
