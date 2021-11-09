import { ECultureDisplayType } from './api-home-management.enum';

// #region popup image
export interface IPopupImageResponse {
  id: string;
  priority: number;
  image: string;
  link: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IPopupImage = Omit<
  IPopupImageResponse,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface IPopupImageUpload {
  id?: string;
  image: string;
  link?: string;
  startDate: Date;
  endDate: Date;
}
// #endregion

// #region announcement
export interface IAnnouncementResponse {
  id: string;
  priority: number;
  topic: string;
  content: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type IAnnouncement = Omit<
  IAnnouncementResponse,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
};
// #endregion

// #region announcement
export interface IMainSlideImageResponse extends IPopupImageResponse {
  content: string;
  topic: string;
}

export interface IMainSlideImage extends IPopupImage {
  id?: string;
  content: string;
  topic: string;
}
// #endregion

// #region photo of electric train
export interface IPhotoOfElectricTrainResponse extends IPopupImageResponse {
  color: string;
  name: string;
}

export interface IPhotoOfElectricTrain extends IPopupImage {
  id: string;
  color: string;
  name: string;
}
// #endregion

// #region corporate culture
export interface ICorporateCultureResponse {
  id: string;
  priority: number;
  topic: string;
  content: string;
  displayType: ECultureDisplayType;
  type: string;
  description: string;
  image: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ICorporateCulture = Omit<
  ICorporateCultureResponse,
  'id' | 'createdAt' | 'updatedAt'
> & {
  id?: string;
};
// #endregion

export interface ICorporateCultureMainImageResponse {
  id: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ICorporateCultureMainImage = Omit<
  ICorporateCultureMainImageResponse,
  'id'
> & {
  id?: string;
};
