import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleWelfarePageContentComponent } from './module-welfare-page-content.component';
import { ModuleWelfarePageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleWelfarePageContentCreatePageComponent } from './pages/create/create.page';
import { ModuleWelfarePageContentUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleWelfarePageContentComponent,
    children: [
      {
        path: '',
        component: ModuleWelfarePageContentIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleWelfarePageContentCreatePageComponent,
      },
      {
        path: `:welfareId/${EPageRoute.UPDATE}`,
        component: ModuleWelfarePageContentUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleWelfarePageContentRoutingModule {}
