import { Component, OnDestroy, OnInit } from '@angular/core';
import { EDefaultData } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigAgencyTable } from '../../models';
import { ModuleRecommendJobPositionToAgencyFacade } from '../../module-recommend-job-position-to-agency-facade';

const initialConfigTable: IConfigAgencyTable = {
  agencies: [],
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};
@Component({
  selector:
    'recruit-supplier-module-recommend-job-position-to-agency-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleRecommendJobPositionToAgencyIndexPageComponent
  implements OnInit, OnDestroy {
  configTable: IConfigAgencyTable = initialConfigTable;

  constructor(
    private facade: ModuleRecommendJobPositionToAgencyFacade,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'รายการต้นสังกัด',
        route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadAgencies() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getAgencies({
        PageNumber: this.configTable.currentPage,
        PageSize: this.configTable.pageSize,
        keyword: this.configTable.keyword,
      });

      this.configTable = {
        ...this.configTable,
        agencies: data,
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
    this.loadAgencies();
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadAgencies();
  }
  // #endregion
}
