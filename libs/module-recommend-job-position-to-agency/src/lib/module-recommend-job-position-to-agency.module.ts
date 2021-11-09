/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';

/**
 * Import component
 */
import { ModuleRecommendJobPositionToAgencyComponent } from './module-recommend-job-position-to-agency.component';
import { ModuleRecommendJobPositionToAgencyAgencyTableComponent } from './components/agency-table/agency-table';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionFormComponent } from './components/recommend-job-position-form/recommend-job-position-form';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionTableComponent } from './components/recommend-job-position-table/recommend-job-position-table';

/**
 * Import router module
 */
import { ModuleRecommendJobPositionToAgencyRoutingModule } from './module-recommend-job-position-to-agency-routing';

/**
 * Import pages
 */
import { ModuleRecommendJobPositionToAgencyIndexPageComponent } from './pages/index/index.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionIndexPageComponent } from './pages/recommend-job-position-index/recommend-job-position-index.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionCreatePageComponent } from './pages/recommend-job-position-create/recommend-job-position-create.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionUpdatePageComponent } from './pages/recommend-job-position-update/recommend-job-position-update.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModuleRecommendJobPositionToAgencyComponent,
    ModuleRecommendJobPositionToAgencyIndexPageComponent,
    ModuleRecommendJobPositionToAgencyAgencyTableComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionFormComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionTableComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionTableComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionIndexPageComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionCreatePageComponent,
    ModuleRecommendJobPositionToAgencyRecommendJobPositionUpdatePageComponent,
  ],
  imports: [
    CommonModule,
    ModuleRecommendJobPositionToAgencyRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RecommendJobPositionToAgencyModule {}
