import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMasterInformation } from '@recruit-supplier/api-master-information';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleMasterInformationFacade } from '../../module-master-information-facade';

@Component({
  selector: 'recruit-supplier-module-master-information-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleMasterInformationCreatePageComponent
  implements OnInit, OnDestroy
{
  isLoading = false;
  masterInformationType: string;
  masterInformationCompany: string;

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
        name: 'เพิ่มข้อมูล Master',
        route: `${EPageRoute.MASTER_INFORMATION}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.MASTER_INFORMATION,
    });

    this.getTypeAndCompanyFromQueryString();
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

  async onCreateMasterInformation(
    masterInformationFormData: IMasterInformation
  ) {
    this.isLoading = true;

    try {
      await this.facade.createMasterInformation(
        masterInformationFormData,
        this.masterInformationType,
        this.masterInformationCompany
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มข้อมูล Master สำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.MASTER_INFORMATION);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มข้อมูล Master ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
