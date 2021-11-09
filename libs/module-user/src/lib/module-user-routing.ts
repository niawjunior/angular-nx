import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleUserComponent } from './module-user.component';
import { ModuleUserCreatePageComponent } from './pages/create/create.page';
import { ModuleUserIndexPageComponent } from './pages/index/index.page';
import { ModuleUserUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleUserComponent,
    children: [
      {
        path: '',
        component: ModuleUserIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleUserCreatePageComponent,
      },
      {
        path: `:userId/${EPageRoute.UPDATE}`,
        component: ModuleUserUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleUserRoutingModule {}
