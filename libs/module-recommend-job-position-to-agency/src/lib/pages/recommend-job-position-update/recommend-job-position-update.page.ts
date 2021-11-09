import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IRecommendJobPosition,
  IRecommendJobPositionResponse,
} from '@recruit-supplier/api-recommend-job-position-to-agency';
import { IUserResponse } from '@recruit-supplier/api-user';
import { EFormMode } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleRecommendJobPositionToAgencyFacade } from '../../module-recommend-job-position-to-agency-facade';

@Component({
  selector:
    'recruit-supplier-module-recommend-job-position-to-agency-recommend-job-position-update-page',
  templateUrl: './recommend-job-position-update.page.html',
  styleUrls: ['./recommend-job-position-update.page.scss'],
})
export class ModuleRecommendJobPositionToAgencyRecommendJobPositionUpdatePageComponent
  implements OnDestroy, OnInit
{
  isLoading = false;
  agencyId = '';
  recommendJobPositionId = '';
  agency: IUserResponse = {} as IUserResponse;
  recommendJobPosition: IRecommendJobPositionResponse =
    {} as IRecommendJobPositionResponse;
  isInitialLoading = true;
  formMode = EFormMode.UPDATE;

  get agencyTitle() {
    return `${this.agency.fullnameTh ?? ''} (${
      this.agency.departmentTh ?? ''
    })`;
  }

  get parentUrl() {
    return `${EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY}/${this.agencyId}/${EPageRoute.RECOMMEND_JOB_POSITION}`;
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
    this.recommendJobPositionId = this.route.snapshot.paramMap.get(
      'recommendJobPositionId'
    );
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
        name: 'แก้ไขรายการแนะนำตำแหน่งงาน',
        route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
    });
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadInitialData() {
    try {
      const agencyRequest = this.facade.getAgencyById(this.agencyId);
      const recommendJobPositionRequest =
        this.facade.getRecommendJobPositionById(
          this.agencyId,
          this.recommendJobPositionId
        );
      this.recommendJobPosition = await recommendJobPositionRequest;
      this.agency = await agencyRequest;
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

  async onUpdateRecommendJobPosition(
    recommendJobPositionFormData: IRecommendJobPosition
  ) {
    this.isLoading = true;
    try {
      await this.facade.updateRecommendJobPosition(
        this.agencyId,
        this.recommendJobPositionId,
        recommendJobPositionFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขรายการแนะนำตำแหน่งงานสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(this.parentUrl as EPageRoute);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขรายการแนะนำตำแหน่งงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
