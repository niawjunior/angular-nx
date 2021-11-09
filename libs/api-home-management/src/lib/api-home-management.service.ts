import { Injectable } from '@angular/core';
import { RequestService } from '@recruit-supplier/utils/http';
import { IDropParams } from '@recruit-supplier/shared';

import {
  IAnnouncement,
  IAnnouncementResponse,
  ICorporateCulture,
  ICorporateCultureMainImage,
  ICorporateCultureMainImageResponse,
  ICorporateCultureResponse,
  IMainSlideImage,
  IMainSlideImageResponse,
  IPhotoOfElectricTrain,
  IPhotoOfElectricTrainResponse,
  IPopupImageResponse,
  IPopupImageUpload,
} from './api-home-management.model';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeManagementService {
  constructor(private http: RequestService) {}

  async getPopupImages() {
    return await this.http.send<IPopupImageResponse[]>('GET', `api/popup`);
  }

  async getPopupImageById(imageId: string) {
    return await this.http.send<IPopupImageResponse>(
      'GET',
      `api/popup/${imageId}`
    );
  }

  async updatePopupImagePriority(params: IDropParams) {
    return await this.http.send(`PUT`, `api/popup/priority/${params.fromId}`, {
      id: params.fromId,
      priority: params.newPriority,
    });
  }

  async createPopupImage(params: IPopupImageUpload) {
    return await this.http.send(`POST`, `api/popup`, params);
  }

  async updatePopupImage(imageId: string, params: IPopupImageUpload) {
    return await this.http.send(`PUT`, `api/popup/${imageId}`, params);
  }

  async deletePopupImage(imageId: string) {
    return await this.http.send('DELETE', `api/popup/${imageId}`);
  }

  // #region announcement
  async getAnnouncements() {
    return await this.http.send<IAnnouncementResponse[]>(
      `GET`,
      `api/home/bts/news`
    );
  }

  async getAnnouncementById(announcementId: string) {
    return await this.http.send<IAnnouncementResponse>(
      `GET`,
      `api/home/bts/news/${announcementId}`
    );
  }

  async createAnnouncement(announcementFormData: IAnnouncement) {
    return await this.http.send(
      'POST',
      `api/home/bts/news`,
      announcementFormData
    );
  }

  async updateAnnouncement(
    announcementId: string,
    announcementFormData: IAnnouncement
  ) {
    return await this.http.send(
      'PUT',
      `api/home/bts/news/${announcementId}`,
      announcementFormData
    );
  }

  async updateAnnouncementPriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/home/bts/news/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteAnnouncement(announcementId: string) {
    return await this.http.send(
      'DELETE',
      `api/home/bts/news/${announcementId}`
    );
  }
  // #endregion

  // #region main-slide-image
  async getMainSlideImages() {
    return await this.http.send<IMainSlideImageResponse[]>(
      `GET`,
      `api/home/slider`
    );
  }

  async getMainSlideImageById(mainSlideImageId: string) {
    return await this.http.send<IMainSlideImageResponse>(
      `GET`,
      `api/home/slider/${mainSlideImageId}`
    );
  }

  async createMainSlideImage(mainSlideImageFormData: IMainSlideImage) {
    return await this.http.send(
      'POST',
      `api/home/slider`,
      mainSlideImageFormData
    );
  }

  async updateMainSlideImage(
    mainSlideImageId: string,
    mainSlideImageFormData: IMainSlideImage
  ) {
    return await this.http.send(
      'PUT',
      `api/home/slider/${mainSlideImageId}`,
      mainSlideImageFormData
    );
  }

  async updateMainSlideImagePriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/home/slider/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteMainSlideImage(mainSlideImageId: string) {
    return await this.http.send(
      'DELETE',
      `api/home/slider/${mainSlideImageId}`
    );
  }
  // #endregion

  // #region photo of electric train
  async getPhotoOfElectricTrains() {
    return await this.http.send<IPhotoOfElectricTrainResponse[]>(
      `GET`,
      `api/home/bts/menu`
    );
  }

  async getPhotoOfElectricTrainById(photoOfElectricId: string) {
    return await this.http.send<IPhotoOfElectricTrainResponse>(
      `GET`,
      `api/home/bts/menu/${photoOfElectricId}`
    );
  }

  async createPhotoOfElectricTrain(
    photoOfElectricFormData: IPhotoOfElectricTrain
  ) {
    return await this.http.send(
      'POST',
      `api/home/bts/menu`,
      photoOfElectricFormData
    );
  }

  async updatePhotoOfElectricTrain(
    photoOfElectricId: string,
    photoOfElectricFormData: IPhotoOfElectricTrain
  ) {
    return await this.http.send(
      'PUT',
      `api/home/bts/menu/${photoOfElectricId}`,
      photoOfElectricFormData
    );
  }

  async updatePhotoOfElectricTrainPriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/home/bts/menu/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deletePhotoOfElectricTrain(photoOfElectricId: string) {
    return await this.http.send(
      'DELETE',
      `api/home/bts/menu/${photoOfElectricId}`
    );
  }
  // #endregion

  // #region corporate culture

  // endpoint to be confirm
  async getCorporateCultureMainImage() {
    return await this.http.send<ICorporateCultureMainImageResponse>(
      'GET',
      `api/home/bts/culture/image`
    );
  }

  // endpoint to be confirm
  async createCorporateCultureMainImage(
    corporateCultureMainImageFormData: ICorporateCultureMainImage
  ) {
    return await this.http.send<ICorporateCultureMainImage>(
      'POST',
      `api/home/bts/culture/image`,
      corporateCultureMainImageFormData
    );
  }

  async updateCorporateCultureMainImage(
    corporateCultureMainImageId: string,
    corporateCultureMainImageFormData: ICorporateCultureMainImage
  ) {
    return await this.http.send<ICorporateCultureMainImage>(
      'PUT',
      `api/home/bts/culture/image/${corporateCultureMainImageId}`,
      corporateCultureMainImageFormData
    );
  }

  async getCorporateCultures() {
    return await this.http.send<ICorporateCultureResponse[]>(
      `GET`,
      `api/home/bts/culture`
    );
  }

  async getCorporateCultureById(corporateCultureId: string) {
    return await this.http.send<ICorporateCultureResponse>(
      `GET`,
      `api/home/bts/culture/${corporateCultureId}`
    );
  }

  async createCorporateCulture(corporateCultureFormData: ICorporateCulture) {
    return await this.http.send(
      'POST',
      `api/home/bts/culture`,
      corporateCultureFormData
    );
  }

  async updateCorporateCulture(
    corporateCultureId: string,
    corporateCultureFormData: ICorporateCulture
  ) {
    return await this.http.send(
      'PUT',
      `api/home/bts/culture/${corporateCultureId}`,
      corporateCultureFormData
    );
  }

  async updateCorporateCulturePriority(params: IDropParams) {
    return await this.http.send(
      `PUT`,
      `api/home/bts/culture/priority/${params.fromId}`,
      {
        id: params.fromId,
        priority: params.newPriority,
      }
    );
  }

  async deleteCorporateCulture(corporateCultureId: string) {
    return await this.http.send(
      'DELETE',
      `api/home/bts/culture/${corporateCultureId}`
    );
  }
  // #endregion
}
