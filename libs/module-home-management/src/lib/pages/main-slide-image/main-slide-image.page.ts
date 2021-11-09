import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IMainSlideImage } from '@recruit-supplier/api-home-management';
import { GlobalService, IBreadcrumb } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConfigMainSlideImagesTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

const initialConfigTable: IConfigMainSlideImagesTable = {
  mainSlideImages: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-home-management-main-slide-image-page',
  templateUrl: './main-slide-image.page.html',
  styleUrls: ['./main-slide-image.page.scss'],
})
export class ModuleHomeManagementMainSlideImagePageComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  constructor(
    private globalService: GlobalService,
    private facade: ModuleHomeManagementFacade,
    private modal: NzModalService
  ) {}

  configTable: IConfigMainSlideImagesTable = initialConfigTable;
  destroy$ = new Subject<void>();
  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าแรก',
        route: EPageRoute.HOME_MANAGEMENT_PHOTO_OF_ELECTRIC_TRAIN,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.HOME_MANAGEMENT_MAIN_SLIDE_IMAGE,
      subMeneOpen: EPageRoute.HOME_MANAGEMENT,
    });

    this.loadMainSlideImages();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.facade.onSubmittedMainSlideImageSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (!value?.id) {
          this.createMainSlideImage(value);
        } else {
          this.updateMainSlideImage(value);
        }
      });
  }

  async loadMainSlideImages() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getMainSlideImages();

      this.configTable = {
        ...this.configTable,
        mainSlideImages: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(mainSlideImageId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteMainSlideImage(mainSlideImageId);
      this.modal.success({
        nzContent: 'ลบ ภาพสไลด์หลักสำเร็จ',
      });
      this.loadMainSlideImages();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ ภาพสไลด์หลักไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onEdit(mainSlideImageId: string) {
    try {
      const result = await this.facade.getMainSlideImageById(mainSlideImageId);
      this.facade.onVisibleMainSlideImageSubject$.next({
        isOpen: true,
        data: result,
      });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพสไลด์หลักไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateMainSlideImagePriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadMainSlideImages();
    }
  }

  async createMainSlideImage(mainSlideImageForm: IMainSlideImage) {
    try {
      await this.facade.createMainSlideImage(mainSlideImageForm);
      this.modal.success({
        nzContent: 'เพิ่ม ภาพสไลด์หลักสำเร็จ',
      });
      this.loadMainSlideImages();
      this.facade.onVisibleMainSlideImageSubject$.next({ isOpen: false });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'เพิ่ม ภาพสไลด์หลักไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async updateMainSlideImage(mainSlideImageForm: IMainSlideImage) {
    try {
      if (mainSlideImageForm?.id) {
        await this.facade.updateMainSlideImage(
          mainSlideImageForm.id,
          mainSlideImageForm
        );
        this.modal.success({
          nzContent: 'แก้ไข ภาพสไลด์หลักสำเร็จ',
        });
        this.loadMainSlideImages();
        this.facade.onVisibleMainSlideImageSubject$.next({ isOpen: false });
      }
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพสไลด์หลักไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }
}
