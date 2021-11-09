import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleHomeManagementComponent } from './module-home-management.component';
import { ModuleHomeManagementAnnouncementPageComponent } from './pages/announcement/announcement.page';
import { ModuleHomeManagementCorporateCulturePageComponent } from './pages/corporate-culture/corporate-culture.page';
import { ModuleHomeManagementIndexPageComponent } from './pages/index/index.page';
import { ModuleHomeManagementMainSlideImagePageComponent } from './pages/main-slide-image/main-slide-image.page';
import { ModuleHomeManagementPhotoOfElectricTrainPageComponent } from './pages/photo-of-electric-train/photo-of-electric-train.page';
import { ModuleHomeManagementPopupImagePageComponent } from './pages/popup-image/popup-image.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleHomeManagementComponent,
    children: [
      {
        path: '',
        component: ModuleHomeManagementIndexPageComponent,
      },
      {
        path: EPageRoute.HOME_MANAGEMENT_POPUP_IMAGE,
        component: ModuleHomeManagementPopupImagePageComponent,
      },
      {
        path: EPageRoute.HOME_MANAGEMENT_ANNOUNCEMENT,
        component: ModuleHomeManagementAnnouncementPageComponent,
      },
      {
        path: EPageRoute.HOME_MANAGEMENT_MAIN_SLIDE_IMAGE,
        component: ModuleHomeManagementMainSlideImagePageComponent
      },
      {
        path: EPageRoute.HOME_MANAGEMENT_PHOTO_OF_ELECTRIC_TRAIN,
        component: ModuleHomeManagementPhotoOfElectricTrainPageComponent
      },
      {
        path: EPageRoute.HOME_MANAGEMENT_CORPORATE_CULTURE,
        component: ModuleHomeManagementCorporateCulturePageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleHomeManagementRoutingModule {}
