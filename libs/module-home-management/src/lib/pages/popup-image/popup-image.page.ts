import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IPopupImageUpload } from '@recruit-supplier/api-home-management';
import { GlobalService, IBreadcrumb } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { IConfigImagesTable } from '../../models/config-table.model';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

const initialConfigTable: IConfigImagesTable = {
  images: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-home-management-popup-image-page',
  templateUrl: './popup-image.page.html',
  styleUrls: ['./popup-image.page.scss'],
})
export class ModuleHomeManagementPopupImagePageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(
    private globalService: GlobalService,
    private facade: ModuleHomeManagementFacade,
    private modal: NzModalService
  ) {}

  configTable: IConfigImagesTable = initialConfigTable;
  submittedPopupImageSubscription?: Subscription;
  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าแรก',
        route: EPageRoute.HOME_MANAGEMENT_POPUP_IMAGE,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.HOME_MANAGEMENT_POPUP_IMAGE,
      subMeneOpen: EPageRoute.HOME_MANAGEMENT,
    });

    this.loadPopupImages();
  }
  ngOnDestroy() {
    this.globalService.setPageLayout(null);
    this.submittedPopupImageSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.submittedPopupImageSubscription =
      this.facade.onSubmittedPopupImageSubject$.subscribe((value) => {
        if (!value?.id) {
          this.createPopupImage(value);
        } else {
          this.updatePopupImage(value);
        }
      });
  }

  async loadPopupImages() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getPopupImages();

      this.configTable = {
        ...this.configTable,
        images: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(imageId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deletePopupImage(imageId);
      this.modal.success({
        nzContent: 'ลบ ภาพป็อบอัพสำเร็จ',
      });
      this.loadPopupImages();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ ภาพป็อบอัพไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onEdit(imageId: string) {
    try {
      const result = await this.facade.getPopupImageById(imageId);
      this.facade.onVisiblePopupImageSubject$.next({
        isOpen: true,
        data: result,
      });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพป็อบอัพไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updatePopupImagePriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadPopupImages();
    }
  }

  async createPopupImage(popupImageForm: IPopupImageUpload) {
    try {
      await this.facade.createPopupImage(popupImageForm);
      this.modal.success({
        nzContent: 'เพิ่ม ภาพป็อบอัพสำเร็จ',
      });
      this.loadPopupImages();
      this.facade.onVisiblePopupImageSubject$.next({ isOpen: false });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'เพิ่ม ภาพป็อบอัพไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async updatePopupImage(popupImageForm: IPopupImageUpload) {
    try {
      if (popupImageForm?.id) {
        await this.facade.updatePopupImage(popupImageForm.id, popupImageForm);
        this.modal.success({
          nzContent: 'แก้ไข ภาพป็อบอัพสำเร็จ',
        });
        this.loadPopupImages();
        this.facade.onVisiblePopupImageSubject$.next({ isOpen: false });
      }
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพป็อบอัพไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }
}
