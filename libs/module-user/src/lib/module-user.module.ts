import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';

/**
 * Import component
 */
import { ModuleUserComponent } from './module-user.component';
import { ModuleUserUserFormComponent } from './components/user-form/user-form';
import { ModuleUserUserTableComponent } from './components/user-table/user-table';

/**
 * Import router module
 */
import { ModuleUserRoutingModule } from './module-user-routing';

/**
 * Import pages
 */
import { ModuleUserIndexPageComponent } from './pages/index/index.page';
import { ModuleUserCreatePageComponent } from './pages/create/create.page';
import { ModuleUserUpdatePageComponent } from './pages/update/update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModuleUserComponent,
    ModuleUserIndexPageComponent,
    ModuleUserUserFormComponent,
    ModuleUserUserTableComponent,
    ModuleUserCreatePageComponent,
    ModuleUserUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleUserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
