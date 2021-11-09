import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleMasterInformationComponent } from './module-master-information.component';
import { ModuleMasterInformationCreatePageComponent } from './pages/create/create.page';
import { ModuleMasterInformationIndexPageComponent } from './pages/index/index.page';
import { ModuleMasterInformationUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleMasterInformationComponent,
    children: [
      {
        path: '',
        component: ModuleMasterInformationIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleMasterInformationCreatePageComponent,
      },
      {
        path: `:masterInformationId/${EPageRoute.UPDATE}`,
        component: ModuleMasterInformationUpdatePageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleMasterInformationRoutingModule {}
