import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IMasterInformation,
  IMasterInformationResponse,
} from '@recruit-supplier/api-master-information';
import { EFormMode } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleMasterInformationFacade } from '../../module-master-information-facade';

@Component({
  selector: 'recruit-supplier-module-master-information-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleMasterInformationUpdatePageComponent
  implements OnInit, OnDestroy
{
  isInitialLoading = false;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  masterInformationId: string;
  masterInformationType: string;
  masterInformationCompany: string;
  masterInformation: IMasterInformationResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleMasterInformationFacade,
    private modal: NzModalService,
    private routerService: RouterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ข้อมูล Master',
        route: EPageRoute.MASTER_INFORMATION,
      },
      {
        name: 'แก้ไขข้อมูล Master',
        route: `${EPageRoute.MASTER_INFORMATION}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.MASTER_INFORMATION,
    });
    this.getTypeAndCompanyFromQueryString();
    this.loadMasterInformationById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  getTypeAndCompanyFromQueryString() {
    this.masterInformationType = this.route.snapshot.queryParamMap.get('type');
    this.masterInformationCompany =
      this.route.snapshot.queryParamMap.get('company');

    if (!this.masterInformationType || !this.masterInformationCompany) {
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.MASTER_INFORMATION);
        },
      });
    }
  }

  async loadMasterInformationById() {
    this.isInitialLoading = true;
    try {
      this.masterInformationId = this.route.snapshot.paramMap.get(
        'masterInformationId'
      );
      const response = await this.facade.getMasterInformationById(
        this.masterInformationId
      );
      this.masterInformation = response.data;
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.MASTER_INFORMATION);
        },
      });
    }
  }

  async onUpdateMasterInformation(
    masterInformationFormData: IMasterInformation
  ) {
    this.isLoading = true;

    try {
      await this.facade.updateMasterInformation(
        this.masterInformationId,
        masterInformationFormData,
        this.masterInformationType,
        this.masterInformationCompany
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขข้อมูล Master สำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.MASTER_INFORMATION);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขข้อมูล Master ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
