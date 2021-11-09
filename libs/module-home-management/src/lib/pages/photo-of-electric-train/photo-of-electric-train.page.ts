import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IPhotoOfElectricTrain } from '@recruit-supplier/api-home-management';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { IConfigPhotoOfElectricTrainTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

const initialConfigTable: IConfigPhotoOfElectricTrainTable = {
  photoOfElectricTrains: [],
  isLoading: false,
};
@Component({
  selector:
    'recruit-supplier-module-home-management-photo-of-electric-train-page',
  templateUrl: './photo-of-electric-train.page.html',
  styleUrls: ['./photo-of-electric-train.page.scss'],
})
export class ModuleHomeManagementPhotoOfElectricTrainPageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  constructor(
    private globalService: GlobalService,
    private facade: ModuleHomeManagementFacade,
    private modal: NzModalService
  ) {}

  configTable: IConfigPhotoOfElectricTrainTable = initialConfigTable;
  submittedPhotoOfElectricTrainSubscription?: Subscription;
  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าแรก',
        route: EPageRoute.HOME_MANAGEMENT_POPUP_IMAGE,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.HOME_MANAGEMENT_PHOTO_OF_ELECTRIC_TRAIN,
      subMeneOpen: EPageRoute.HOME_MANAGEMENT,
    });

    this.loadPhotoOfElectricTrains();
  }
  ngOnDestroy() {
    this.globalService.setPageLayout(null);
    this.submittedPhotoOfElectricTrainSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.submittedPhotoOfElectricTrainSubscription =
      this.facade.onSubmittedPhotoOfElectricTrainSubject$.subscribe((value) => {
        if (!value?.id) {
          this.createPhotoOfElectricTrain(value);
        } else {
          this.updatePhotoOfElectricTrain(value);
        }
      });
  }

  async loadPhotoOfElectricTrains() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getPhotoOfElectricTrains();

      this.configTable = {
        ...this.configTable,
        photoOfElectricTrains: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(photoOfElectricTrainId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deletePhotoOfElectricTrain(photoOfElectricTrainId);
      this.modal.success({
        nzContent: 'ลบ ภาพสายรถไฟฟ้าสำเร็จ',
      });
      this.loadPhotoOfElectricTrains();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ ภาพสายรถไฟฟ้าไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onEdit(photoOfElectricTrainId: string) {
    try {
      const result = await this.facade.getPhotoOfElectricTrainById(
        photoOfElectricTrainId
      );
      this.facade.onVisiblePhotoOfElectricTrainSubject$.next({
        isOpen: true,
        data: result,
      });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพสายรถไฟฟ้าไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updatePhotoOfElectricTrainPriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadPhotoOfElectricTrains();
    }
  }

  async createPhotoOfElectricTrain(
    photoOfElectricFormData: IPhotoOfElectricTrain
  ) {
    try {
      await this.facade.createPhotoOfElectricTrain(photoOfElectricFormData);
      this.modal.success({
        nzContent: 'เพิ่ม ภาพสายรถไฟฟ้าสำเร็จ',
      });
      this.loadPhotoOfElectricTrains();
      this.facade.onVisiblePhotoOfElectricTrainSubject$.next({ isOpen: false });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'เพิ่ม ภาพสายรถไฟฟ้าไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async updatePhotoOfElectricTrain(
    photoOfElectricFormData: IPhotoOfElectricTrain
  ) {
    try {
      if (photoOfElectricFormData?.id) {
        await this.facade.updatePhotoOfElectricTrain(
          photoOfElectricFormData.id,
          photoOfElectricFormData
        );
        this.modal.success({
          nzContent: 'แก้ไข ภาพสายรถไฟฟ้าสำเร็จ',
        });
        this.loadPhotoOfElectricTrains();
        this.facade.onVisiblePhotoOfElectricTrainSubject$.next({
          isOpen: false,
        });
      }
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ภาพสายรถไฟฟ้าไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }
}
