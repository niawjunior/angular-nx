import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Import component
 */
import { ModuleMasterInformationComponent } from './module-master-information.component';
import { ModuleMasterInformationMasterInformationTableComponent } from './components/master-information-table/master-information-table';

/**
 * Import router module
 */
import { ModuleMasterInformationRoutingModule } from './module-master-information-routing';

/**
 * Import pages
 */
import { ModuleMasterInformationIndexPageComponent } from './pages/index/index.page';
import { ModuleMasterInformationCreatePageComponent } from './pages/create/create.page';
import { SharedModule } from '@recruit-supplier/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleMasterInformationUpdatePageComponent } from './pages/update/update.page';
import { ModuleMasterInformationMasterInformationFormComponent } from './components/master-information-form/master-information-form';

@NgModule({
  declarations: [
    ModuleMasterInformationComponent,
    ModuleMasterInformationIndexPageComponent,
    ModuleMasterInformationCreatePageComponent,
    ModuleMasterInformationUpdatePageComponent,
    ModuleMasterInformationMasterInformationTableComponent,
    ModuleMasterInformationMasterInformationFormComponent,
  ],
  imports: [
    CommonModule,
    ModuleMasterInformationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MasterInformationModule {}
