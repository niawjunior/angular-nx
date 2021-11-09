import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMarqueeModule } from 'ng-marquee';
import { ColorPickerModule } from 'ngx-color-picker';
import { YouTubePlayerModule } from '@angular/youtube-player';

/**
 * Import component
 */
import { ModuleHomeManagementComponent } from './module-home-management.component';
import { ModuleHomeManagementPopupImageTableComponent } from './components/popup-image-table/popup-image-table';
import { ModuleHomeManagementPopupImageModalComponent } from './components/popup-image-modal/popup-image-modal';
import { ModuleHomeManagementAnnouncementTableComponent } from './components/announcement-table/announcement-table';
import { ModuleHomeManagementPhotoOfElectricTrainTableComponent } from './components/photo-of-electric-train-table/photo-of-electric-train-table';
import { ModuleHomeManagementCorporateCultureTableComponent } from './components/corporate-culture-table/corporate-culture-table';
import { ModuleHomeManagementAnnouncementModalComponent } from './components/announcement-modal/announcement-modal';
import { ModuleHomeManagementMainSlideImageTableComponent } from './components/main-slide-image-table/main-slide-image-table';
import { ModuleHomeManagementCorporateCultureModalComponent } from './components/corporate-culture-modal/corporate-culture-modal';
import { ModuleHomeManagementPhotoOfElectricTrainModalComponent } from './components/photo-of-electric-train-modal/photo-of-electric-train-modal';
/**
 * Import router module
 */
import { ModuleHomeManagementRoutingModule } from './module-home-management-routing';

/**
 * Import pages
 */
import { ModuleHomeManagementIndexPageComponent } from './pages/index/index.page';
import { ModuleHomeManagementPopupImagePageComponent } from './pages/popup-image/popup-image.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModuleHomeManagementAnnouncementPageComponent } from './pages/announcement/announcement.page';
import { ModuleHomeManagementPhotoOfElectricTrainPageComponent } from './pages/photo-of-electric-train/photo-of-electric-train.page';
import { ModuleHomeManagementCorporateCulturePageComponent } from './pages/corporate-culture/corporate-culture.page';
import { ModuleHomeManagementMainSlideImagePageComponent } from './pages/main-slide-image/main-slide-image.page';
import { ModuleHomeManagementMainSlideImageModalComponent } from './components/main-slide-image-modal/main-slide-image-modal';
import { ModuleHomeManagementCorporateCultureMainImageComponent } from './components/corporate-culture-main-image/corporate-culture-main-image';
@NgModule({
  declarations: [
    ModuleHomeManagementIndexPageComponent,
    ModuleHomeManagementComponent,
    // popup image
    ModuleHomeManagementPopupImagePageComponent,
    ModuleHomeManagementPopupImageTableComponent,
    ModuleHomeManagementPopupImageModalComponent,
    // announcement
    ModuleHomeManagementAnnouncementPageComponent,
    ModuleHomeManagementAnnouncementTableComponent,
    ModuleHomeManagementAnnouncementModalComponent,
    // corporte culture
    ModuleHomeManagementCorporateCulturePageComponent,
    ModuleHomeManagementCorporateCultureTableComponent,
    ModuleHomeManagementCorporateCultureModalComponent,
    ModuleHomeManagementCorporateCultureMainImageComponent,
    // main slide image
    ModuleHomeManagementMainSlideImagePageComponent,
    ModuleHomeManagementMainSlideImageTableComponent,
    ModuleHomeManagementMainSlideImageModalComponent,
    //phto of electric train
    ModuleHomeManagementPhotoOfElectricTrainPageComponent,
    ModuleHomeManagementPhotoOfElectricTrainTableComponent,
    ModuleHomeManagementPhotoOfElectricTrainModalComponent,
  ],
  imports: [
    CommonModule,
    ModuleHomeManagementRoutingModule,
    SharedModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgMarqueeModule,
    ColorPickerModule,
    YouTubePlayerModule,
  ],
})
export class HomeManagementModule {}
