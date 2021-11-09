import {
  IAnnouncementResponse,
  ICorporateCultureResponse,
  IMainSlideImageResponse,
  IPhotoOfElectricTrainResponse,
  IPopupImageResponse,
} from '@recruit-supplier/api-home-management';
import { ITableParams } from '@recruit-supplier/shared';
export interface IConfigImagesTable extends ITableParams {
  images: IPopupImageResponse[];
}

export interface IConfigAnnouncementTable extends ITableParams {
  announcements: IAnnouncementResponse[];
}

export interface IConfigMainSlideImagesTable extends ITableParams {
  mainSlideImages: IMainSlideImageResponse[];
}
export interface IConfigCorporateCultureTable extends ITableParams {
  corporateCultures: ICorporateCultureResponse[];
}

export interface IConfigPhotoOfElectricTrainTable extends ITableParams {
  photoOfElectricTrains: IPhotoOfElectricTrainResponse[];
}
