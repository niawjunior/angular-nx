import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@recruit-supplier/shared';
import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * Import component
 */
import { ModuleJobPositionComponent } from './module-job-position.component';
import { JobPositionTableComponent } from './components/job-position-table/job-position-table';
import { JobPositionFormComponent } from './components/job-position-form/job-position-form';

/**
 * Import router module
 */
import { ModuleJobPositionRoutingModule } from './module-job-position-routing';

/**
 * Import pages
 */
import { ModuleJobPositionIndexPageComponent } from './pages/index/index.page';
import { ModuleJobPositionCreatePageComponent } from './pages/create/create.page';
import { ModuleJobPositionUpdatePageComponent } from './pages/update/update.page';

@NgModule({
  declarations: [
    ModuleJobPositionComponent,
    ModuleJobPositionIndexPageComponent,
    JobPositionTableComponent,
    JobPositionFormComponent,
    ModuleJobPositionCreatePageComponent,
    ModuleJobPositionUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleJobPositionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class JobPositionModule {}
