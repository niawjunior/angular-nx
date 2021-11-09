/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleRecommendJobPositionToAgencyComponent } from './module-recommend-job-position-to-agency.component';
import { ModuleRecommendJobPositionToAgencyIndexPageComponent } from './pages/index/index.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionCreatePageComponent } from './pages/recommend-job-position-create/recommend-job-position-create.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionIndexPageComponent } from './pages/recommend-job-position-index/recommend-job-position-index.page';
import { ModuleRecommendJobPositionToAgencyRecommendJobPositionUpdatePageComponent } from './pages/recommend-job-position-update/recommend-job-position-update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleRecommendJobPositionToAgencyComponent,
    children: [
      {
        path: '',
        component: ModuleRecommendJobPositionToAgencyIndexPageComponent,
      },
      {
        path: `:agencyId/${EPageRoute.RECOMMEND_JOB_POSITION}`,
        component: ModuleRecommendJobPositionToAgencyRecommendJobPositionIndexPageComponent,
      },
      {
        path: `:agencyId/${EPageRoute.RECOMMEND_JOB_POSITION}/${EPageRoute.CREATE}`,
        component: ModuleRecommendJobPositionToAgencyRecommendJobPositionCreatePageComponent,
      },
      {
        path: `:agencyId/${EPageRoute.RECOMMEND_JOB_POSITION}/:recommendJobPositionId/${EPageRoute.UPDATE}`,
        component: ModuleRecommendJobPositionToAgencyRecommendJobPositionUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleRecommendJobPositionToAgencyRoutingModule {}
