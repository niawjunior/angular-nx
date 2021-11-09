import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ICorporateCulture,
  ICorporateCultureMainImage,
  ICorporateCultureMainImageResponse,
} from '@recruit-supplier/api-home-management';
import { GlobalService, IBreadcrumb } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { IConfigCorporateCultureTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

const initialConfigTable: IConfigCorporateCultureTable = {
  corporateCultures: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-home-management-corporate-culture-page',
  templateUrl: './corporate-culture.page.html',
  styleUrls: ['./corporate-culture.page.scss'],
})
export class ModuleHomeManagementCorporateCulturePageComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  corporateCulterMainImage?: ICorporateCultureMainImageResponse;
  configTable: IConfigCorporateCultureTable = initialConfigTable;
  submittedCorporateCultureSubscription?: Subscription;
  isLoadingMainImage = false;
  constructor(
    private globalService: GlobalService,
    private facade: ModuleHomeManagementFacade,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าแรก',
        route: EPageRoute.HOME_MANAGEMENT_CORPORATE_CULTURE,
      },
    ];

    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.HOME_MANAGEMENT_CORPORATE_CULTURE,
      subMeneOpen: EPageRoute.HOME_MANAGEMENT,
    });
    this.loadCorporateCultureMainImage();

    this.loadCorporateCultures();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
    this.submittedCorporateCultureSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.submittedCorporateCultureSubscription =
      this.facade.onSubmittedCorporateCultureSubject$.subscribe((value) => {
        if (!value?.id) {
          this.createCorporateCulture(value);
        } else {
          this.updateCorporateCulture(value);
        }
      });
  }

  async loadCorporateCultureMainImage() {
    this.isLoadingMainImage = true;
    try {
      this.corporateCulterMainImage =
        await this.facade.getCorporateCultureMainImage();
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoadingMainImage = false;
    }
  }

  async onSubmitCorporteCulterMainImage(
    corporateCultureMainImageForm: ICorporateCultureMainImage
  ) {
    if (corporateCultureMainImageForm?.id) {
      try {
        await this.facade.updateCorporateCultureMainImage(
          corporateCultureMainImageForm?.id,
          corporateCultureMainImageForm
        );
        this.modal.success({
          nzContent: 'แก้ไข ภาพวัฒนธรรมหลัก สำเร็จ',
        });
      } catch (e) {
        console.log(e);
        this.modal.error({
          nzContent: 'แก้ไข ภาพวัฒนธรรมหลัก ไม่สำเร็จ เนื่องจาก ...',
        });
      }
    } else {
      try {
        await this.facade.createCorporateCultureMainImage(
          corporateCultureMainImageForm
        );
        this.modal.success({
          nzContent: 'เพิ่ม ภาพวัฒนธรรมหลัก สำเร็จ',
        });
      } catch (e) {
        console.log(e);
        this.modal.error({
          nzContent: 'เพิ่ม ภาพวัฒนธรรมหลัก ไม่สำเร็จ เนื่องจาก ...',
        });
      }
    }
  }

  async loadCorporateCultures() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getCorporateCultures();

      this.configTable = {
        ...this.configTable,
        corporateCultures: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(corporateCultureId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteCorporateCulture(corporateCultureId);
      this.modal.success({
        nzIconType: '',
        nzContent: 'ลบ วัฒนธรรมองค์กรสำเร็จ',
      });
      this.loadCorporateCultures();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ วัฒนธรรมองค์กรไม่สำเร็จ เนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onEdit(corporateCultureId: string) {
    try {
      const result = await this.facade.getCorporateCultureById(
        corporateCultureId
      );
      this.facade.onVisibleCorporateCultureSubject$.next({
        isOpen: true,
        data: result,
      });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข วัฒนธรรมองค์กรไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateCorporateCulturePriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadCorporateCultures();
    }
  }

  async createCorporateCulture(corporateCultureForm: ICorporateCulture) {
    try {
      await this.facade.createCorporateCulture(corporateCultureForm);
      this.modal.success({
        nzContent: 'เพิ่ม วัฒนธรรมองค์กรสำเร็จ',
      });
      this.loadCorporateCultures();
      this.facade.onVisibleCorporateCultureSubject$.next({ isOpen: false });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'เพิ่ม วัฒนธรรมองค์กรไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }

  async updateCorporateCulture(corporateCultureForm: ICorporateCulture) {
    try {
      if (corporateCultureForm?.id) {
        await this.facade.updateCorporateCulture(
          corporateCultureForm.id,
          corporateCultureForm
        );
        this.modal.success({
          nzContent: 'แก้ไข วัฒนธรรมองค์กรสำเร็จ',
        });
        this.loadCorporateCultures();
        this.facade.onVisibleCorporateCultureSubject$.next({ isOpen: false });
      }
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข วัฒนธรรมองค์กรไม่สำเร็จ เนื่องจาก ...',
      });
    }
  }
}
