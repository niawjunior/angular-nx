import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Import component
 */
import { ModuleInternshipPageContentComponent } from './module-internship-page-content.component';
import { ModuleInternshipPageContentInternshipPageContentFormComponent } from './components/internship-page-content-form/internship-page-content-form';
import { ModuleInternshipPageContentInternshipPageContentTableComponent } from './components/internship-page-content-table/internship-page-content-table';
/**
 * Import router module
 */
import { ModuleInternshipPageContentRoutingModule } from './module-internship-page-content-routing';

/**
 * Import pages
 */
import { ModuleInternshipPageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleInternshipPageContentCreatePageComponent } from './pages/create/create.page';
import { ModuleInternshipPageContentUpdatePageComponent } from './pages/update/update.page';

@NgModule({
  declarations: [
    ModuleInternshipPageContentComponent,
    ModuleInternshipPageContentIndexPageComponent,
    ModuleInternshipPageContentInternshipPageContentFormComponent,
    ModuleInternshipPageContentInternshipPageContentTableComponent,
    ModuleInternshipPageContentCreatePageComponent,
    ModuleInternshipPageContentUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleInternshipPageContentRoutingModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InternshipPageContentModule {}
