import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserResponse } from '@recruit-supplier/api-user';
import { EDefaultData } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigRecommendJobPositionTable } from '../../models';
import { ModuleRecommendJobPositionToAgencyFacade } from '../../module-recommend-job-position-to-agency-facade';

const initialConfigTable: IConfigRecommendJobPositionTable = {
  recommendJobPositions: [],
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};
@Component({
  selector:
    'recruit-supplier-module-recommend-job-position-to-agency-recommend-job-position-index-page',
  templateUrl: './recommend-job-position-index.page.html',
  styleUrls: ['./recommend-job-position-index.page.scss'],
})
export class ModuleRecommendJobPositionToAgencyRecommendJobPositionIndexPageComponent
  implements OnInit, OnDestroy
{
  configTable: IConfigRecommendJobPositionTable = initialConfigTable;
  agencyId: string;
  agency: IUserResponse = {} as IUserResponse;
  isInitialLoading = true;

  get agencyTitle() {
    return `${this.agency.fullnameTh ?? ''} (${
      this.agency.departmentTh ?? ''
    })`;
  }

  constructor(
    private facade: ModuleRecommendJobPositionToAgencyFacade,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'รายการต้นสังกัด',
        route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      },
      {
        name: 'รายการแนะนำตำแหน่งงาน',
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
    this.agencyId = this.route.snapshot.paramMap.get('agencyId');
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

  async loadRecommendJobPositions() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getRecommendJobPositions(this.agencyId, {
        PageNumber: this.configTable.currentPage,
        PageSize: this.configTable.pageSize,
        keyword: this.configTable.keyword,
      });

      this.configTable = {
        ...this.configTable,
        recommendJobPositions: data,
        isLoading: false,
        currentPage,
        pageSize,
        total: totalRecords,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  // #region event
  onParamsChange(params: NzTableQueryParams) {
    this.configTable.currentPage = params.pageIndex;
    this.configTable.pageSize = params.pageSize;
    this.loadRecommendJobPositions();
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadRecommendJobPositions();
  }

  async onDelete(recommendJobPositionId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteRecommendJobPosition(
        this.agencyId,
        recommendJobPositionId
      );
      this.modal.success({
        nzContent: 'ลบรายการแนะนำตำแหน่งงานสำเร็จ',
      });
      this.loadRecommendJobPositions();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบรายการแนะนำตำแหน่งงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }
  // #endregion
}
