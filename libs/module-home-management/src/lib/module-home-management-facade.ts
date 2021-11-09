import { Injectable } from '@angular/core';
import {
  ApiHomeManagementService,
  IAnnouncement,
  IAnnouncementResponse,
  ICorporateCulture,
  ICorporateCultureMainImage,
  ICorporateCultureResponse,
  IMainSlideImage,
  IMainSlideImageResponse,
  IPhotoOfElectricTrain,
  IPhotoOfElectricTrainResponse,
  IPopupImageResponse,
  IPopupImageUpload,
} from '@recruit-supplier/api-home-management';
import { ApiUploadFileService } from '@recruit-supplier/api-upload-file';
import { ModuleHomeManagementStore } from './store/module-home-management.store';
import { ModuleHomeManagementStoreQuery } from './store/module-home-management.query';
import { IDropParams } from '@recruit-supplier/shared';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModuleHomeManagementFacade {
  onSubmittedPopupImageSubject$: Subject<IPopupImageUpload> = new Subject();
  onVisiblePopupImageSubject$: Subject<{
    isOpen: boolean;
    data?: IPopupImageResponse;
  }> = new Subject();

  onSubmittedAnnouncementSubject$: Subject<IAnnouncement> = new Subject();
  onVisibleAnnouncementSubject$: Subject<{
    isOpen: boolean;
    data?: IAnnouncementResponse;
  }> = new Subject();

  onSubmittedMainSlideImageSubject$: Subject<IMainSlideImage> = new Subject();
  onVisibleMainSlideImageSubject$: Subject<{
    isOpen: boolean;
    data?: IMainSlideImageResponse;
  }> = new Subject();

  onSubmittedCorporateCultureSubject$: Subject<ICorporateCulture> =
    new Subject();
  onVisibleCorporateCultureSubject$: Subject<{
    isOpen: boolean;
    data?: ICorporateCultureResponse;
  }> = new Subject();

  onSubmittedPhotoOfElectricTrainSubject$: Subject<IPhotoOfElectricTrain> =
    new Subject();
  onVisiblePhotoOfElectricTrainSubject$: Subject<{
    isOpen: boolean;
    data?: IPhotoOfElectricTrainResponse;
  }> = new Subject();

  constructor(
    private store: ModuleHomeManagementStore,
    private storeQuery: ModuleHomeManagementStoreQuery,
    private apiHomeManagement: ApiHomeManagementService,
    private apiUploadFile: ApiUploadFileService
  ) {}

  setInitialized() {
    this.store.update({ isInitialized: true });
  }

  getLoadStatus() {
    return this.storeQuery.getInitializedStatus();
  }

  resetStore() {
    this.store.reset();
  }

  // #region popup image
  getPopupImages() {
    return this.apiHomeManagement.getPopupImages();
  }

  getPopupImageById(imageId: string) {
    return this.apiHomeManagement.getPopupImageById(imageId);
  }

  updatePopupImagePriority(params: IDropParams) {
    return this.apiHomeManagement.updatePopupImagePriority(params);
  }

  deletePopupImage(imageId: string) {
    return this.apiHomeManagement.deletePopupImage(imageId);
  }

  createPopupImage(params: IPopupImageUpload) {
    return this.apiHomeManagement.createPopupImage(params);
  }

  updatePopupImage(imageId: string, params: IPopupImageUpload) {
    return this.apiHomeManagement.updatePopupImage(imageId, params);
  }

  uploadFile(params: FormData) {
    return this.apiUploadFile.uploadFile(params);
  }
  // #endregion

  // #region announcement
  getAnnouncements() {
    return this.apiHomeManagement.getAnnouncements();
  }

  getAnnouncementById(announcementId: string) {
    return this.apiHomeManagement.getAnnouncementById(announcementId);
  }

  createAnnouncement(announcementFormData: IAnnouncement) {
    return this.apiHomeManagement.createAnnouncement(announcementFormData);
  }

  updateAnnouncement(
    announcementId: string,
    announcementFormData: IAnnouncement
  ) {
    return this.apiHomeManagement.updateAnnouncement(
      announcementId,
      announcementFormData
    );
  }

  updateAnnouncementPriority(params: IDropParams) {
    return this.apiHomeManagement.updateAnnouncementPriority(params);
  }

  deleteAnnouncement(announcementId: string) {
    return this.apiHomeManagement.deleteAnnouncement(announcementId);
  }
  // #endregion

  // #region main slide image
  getMainSlideImages() {
    return this.apiHomeManagement.getMainSlideImages();
  }

  getMainSlideImageById(mainSlideImageId: string) {
    return this.apiHomeManagement.getMainSlideImageById(mainSlideImageId);
  }

  createMainSlideImage(mainSlideImageFormData: IMainSlideImage) {
    return this.apiHomeManagement.createMainSlideImage(mainSlideImageFormData);
  }

  updateMainSlideImage(
    mainSlideImageId: string,
    mainSlideImageFormData: IMainSlideImage
  ) {
    return this.apiHomeManagement.updateMainSlideImage(
      mainSlideImageId,
      mainSlideImageFormData
    );
  }

  updateMainSlideImagePriority(params: IDropParams) {
    return this.apiHomeManagement.updateMainSlideImagePriority(params);
  }

  deleteMainSlideImage(mainSlideImageId: string) {
    return this.apiHomeManagement.deleteMainSlideImage(mainSlideImageId);
  }
  // #endregion

  // #region photo of electric train
  getPhotoOfElectricTrains() {
    return this.apiHomeManagement.getPhotoOfElectricTrains();
  }

  getPhotoOfElectricTrainById(photoOfElectricId: string) {
    return this.apiHomeManagement.getPhotoOfElectricTrainById(
      photoOfElectricId
    );
  }

  createPhotoOfElectricTrain(photoOfElectricFormData: IPhotoOfElectricTrain) {
    return this.apiHomeManagement.createPhotoOfElectricTrain(
      photoOfElectricFormData
    );
  }

  updatePhotoOfElectricTrain(
    photoOfElectricId: string,
    photoOfElectricFormData: IPhotoOfElectricTrain
  ) {
    return this.apiHomeManagement.updatePhotoOfElectricTrain(
      photoOfElectricId,
      photoOfElectricFormData
    );
  }

  updatePhotoOfElectricTrainPriority(params: IDropParams) {
    return this.apiHomeManagement.updatePhotoOfElectricTrainPriority(params);
  }

  deletePhotoOfElectricTrain(photoOfElectricId: string) {
    return this.apiHomeManagement.deletePhotoOfElectricTrain(photoOfElectricId);
  }
  // #endregion

  // #region corporate culture

  getCorporateCultureMainImage() {
    return this.apiHomeManagement.getCorporateCultureMainImage();
  }

  createCorporateCultureMainImage(
    corporateCultureMainImageFormData: ICorporateCultureMainImage
  ) {
    return this.apiHomeManagement.createCorporateCultureMainImage(
      corporateCultureMainImageFormData
    );
  }

  updateCorporateCultureMainImage(
    corporateCultureMainImageId: string,
    corporateCultureMainImageFormData: ICorporateCultureMainImage
  ) {
    return this.apiHomeManagement.updateCorporateCultureMainImage(
      corporateCultureMainImageId,
      corporateCultureMainImageFormData
    );
  }

  getCorporateCultures() {
    return this.apiHomeManagement.getCorporateCultures();
  }

  getCorporateCultureById(corporateCultureId: string) {
    return this.apiHomeManagement.getCorporateCultureById(corporateCultureId);
  }

  createCorporateCulture(corporateCultureFormData: ICorporateCulture) {
    return this.apiHomeManagement.createCorporateCulture(
      corporateCultureFormData
    );
  }

  updateCorporateCulture(
    corporateCultureId: string,
    corporateCultureFormData: ICorporateCulture
  ) {
    return this.apiHomeManagement.updateCorporateCulture(
      corporateCultureId,
      corporateCultureFormData
    );
  }

  updateCorporateCulturePriority(params: IDropParams) {
    return this.apiHomeManagement.updateAnnouncementPriority(params);
  }

  deleteCorporateCulture(corporateCultureId: string) {
    return this.apiHomeManagement.deleteCorporateCulture(corporateCultureId);
  }
  // #endregion
}
