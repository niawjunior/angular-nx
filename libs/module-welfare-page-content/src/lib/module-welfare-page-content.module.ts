import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';

/**
 * Import component
 */
import { ModuleWelfarePageContentComponent } from './module-welfare-page-content.component';
import { ModuleWelfarePageContentWelfarePageContentFormComponent } from './components/welfare-page-content-form/welfare-page-content-form';
import { ModuleWelfarePageContentWelfarePageContentTableComponent } from './components/welfare-page-content-table/welfare-page-content-table';

/**
 * Import router module
 */
import { ModuleWelfarePageContentRoutingModule } from './module-welfare-page-content-routing';

/**
 * Import pages
 */
import { ModuleWelfarePageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleWelfarePageContentCreatePageComponent } from './pages/create/create.page';
import { ModuleWelfarePageContentUpdatePageComponent } from './pages/update/update.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModuleWelfarePageContentComponent,
    ModuleWelfarePageContentIndexPageComponent,
    ModuleWelfarePageContentWelfarePageContentFormComponent,
    ModuleWelfarePageContentWelfarePageContentTableComponent,
    ModuleWelfarePageContentCreatePageComponent,
    ModuleWelfarePageContentUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleWelfarePageContentRoutingModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WelfarePageContentModule {}
