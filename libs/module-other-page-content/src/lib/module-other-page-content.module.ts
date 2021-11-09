import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@recruit-supplier/shared';

/**
 * Import component
 */
import { ModuleOtherPageContentComponent } from './module-other-page-content.component';
import { ModuleOtherPageContentManageOtherPageContentFormComponent } from './components/manage-other-page-content-form/manage-other-page-content-form';
import { ModuleOtherPageContentManageOtherPageContentTableComponent } from './components/manage-other-page-content-table/manage-other-page-content-table';
import { ModuleOtherPageContentOtherPageContentFormComponent } from './components/other-page-content-form/other-page-content-form';
import { ModuleOtherPageContentOtherPageContentTableComponent } from './components/other-page-content-table/other-page-content-table';

/**
 * Import router module
 */
import { ModuleOtherPageContentRoutingModule } from './module-other-page-content-routing';

/**
 * Import pages
 */
import { ModuleOtherPageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleOtherPageContentManageOtherPageContentIndexPageComponent } from './pages/manage-other-page-content-index/manage-other-page-content-index.page';
import { ModuleOtherPageContentManageOtherPageContentCreatePageComponent } from './pages/manage-other-page-content-create/manage-other-page-content-create.page';
import { ModuleOtherPageContentManageOtherPageContentUpdatePageComponent } from './pages/manage-other-page-content-update/manage-other-page-content-update.page';
import { ModuleOtherPageContentCreatePageComponent } from './pages/create/create.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    ModuleOtherPageContentComponent,
    ModuleOtherPageContentIndexPageComponent,
    ModuleOtherPageContentCreatePageComponent,
    ModuleOtherPageContentManageOtherPageContentFormComponent,
    ModuleOtherPageContentManageOtherPageContentTableComponent,
    ModuleOtherPageContentOtherPageContentFormComponent,
    ModuleOtherPageContentOtherPageContentTableComponent,
    ModuleOtherPageContentManageOtherPageContentIndexPageComponent,
    ModuleOtherPageContentManageOtherPageContentCreatePageComponent,
    ModuleOtherPageContentManageOtherPageContentUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleOtherPageContentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
})
export class OtherPageContentModule {}
