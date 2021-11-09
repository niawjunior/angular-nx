import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleRoleComponent } from './module-role.component';
import { ModuleRoleCreatePageComponent } from './pages/create/create.page';
import { ModuleRoleIndexPageComponent } from './pages/index/index.page';
import { ModuleRoleUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleRoleComponent,
    children: [
      {
        path: '',
        component: ModuleRoleIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleRoleCreatePageComponent,
      },
      {
        path: `:roleId/${EPageRoute.UPDATE}`,
        component: ModuleRoleUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleRoleRoutingModule {}
