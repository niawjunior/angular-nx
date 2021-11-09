import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecommendJobPosition } from '@recruit-supplier/api-recommend-job-position-to-agency';
import { IUserResponse } from '@recruit-supplier/api-user';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleRecommendJobPositionToAgencyFacade } from '../../module-recommend-job-position-to-agency-facade';

@Component({
  selector:
    'recruit-supplier-module-recommend-job-position-to-agency-recommend-job-position-create-page',
  templateUrl: './recommend-job-position-create.page.html',
  styleUrls: ['./recommend-job-position-create.page.scss'],
})
export class ModuleRecommendJobPositionToAgencyRecommendJobPositionCreatePageComponent
  implements OnDestroy, OnInit
{
  isLoading = false;
  agencyId = '';
  agency: IUserResponse = {} as IUserResponse;
  isInitialLoading = true;

  get agencyTitle() {
    return `${this.agency.fullnameTh ?? ''} (${
      this.agency.departmentTh ?? ''
    })`;
  }

  get parentUrl(){
    return `${EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY}/${this.agencyId}/${EPageRoute.RECOMMEND_JOB_POSITION}`
  }

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private facade: ModuleRecommendJobPositionToAgencyFacade,
    private modal: NzModalService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('agencyId');
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'รายการต้นสังกัด',
        route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      },
      {
        name: 'รายการแนะนำตำแหน่งงาน',
        route: this.parentUrl,
      },
      {
        name: 'เพิ่มรายการแนะนำตำแหน่งงาน',
        route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
    });
    this.loadAgencyById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadAgencyById() {
    try {
      this.agency = await this.facade.getAgencyById(this.agencyId);
      this.isInitialLoading = false;
    } catch (error) {
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY);
        },
      });
    }
  }

  async onCreateRecommendJobPosition(
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    this.isLoading = true;
    try {
      await this.facade.createRecommendJobPosition(
        this.agencyId,
        recommendJobPositionFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มรายการแนะนำตำแหน่งงานสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(this.parentUrl as EPageRoute);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มรายการแนะนำตำแหน่งงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
