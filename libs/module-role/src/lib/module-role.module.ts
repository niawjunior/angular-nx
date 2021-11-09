import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';
/**
 * Import component
 */
import { ModuleRoleComponent } from './module-role.component';
import { ModuleRoleRoleTableComponent } from './components/role-table/role-table';
import { ModuleRoleRoleFormComponent } from './components/role-form/role-form';

/**
 * Import router module
 */
import { ModuleRoleRoutingModule } from './module-role-routing';

/**
 * Import pages
 */
import { ModuleRoleIndexPageComponent } from './pages/index/index.page';
import { ModuleRoleCreatePageComponent } from './pages/create/create.page';
import { ModuleRoleUpdatePageComponent } from './pages/update/update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModuleRoleComponent,
    ModuleRoleIndexPageComponent,
    ModuleRoleRoleTableComponent,
    ModuleRoleRoleFormComponent,
    ModuleRoleCreatePageComponent,
    ModuleRoleUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleRoleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RoleModule {}
