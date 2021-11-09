import { Component, OnDestroy, OnInit } from '@angular/core';
import { EDefaultData } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IConfigJobPositionTable } from '../../models/config-table.model';
import { ModuleJobPositionFacade } from '../../module-job-position-facade';

const initialConfigTable: IConfigJobPositionTable = {
  jobPositions: [],
  isOpen: true,
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};

@Component({
  selector: 'recruit-supplier-module-job-position-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleJobPositionIndexPageComponent implements OnInit, OnDestroy {
  configTable: IConfigJobPositionTable = initialConfigTable;

  constructor(
    private facade: ModuleJobPositionFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ตำแหน่งงานที่รับสมัคร',
        route: EPageRoute.JOB_POSITION,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.JOB_POSITION,
    });
  }

  async loadJobPositions() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getJobPositions(
        {
          PageNumber: this.configTable.currentPage,
          PageSize: this.configTable.pageSize,
          keyword: this.configTable.keyword,
        },
        this.configTable.isOpen
      );

      this.configTable = {
        ...this.configTable,
        jobPositions: data,
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
    this.loadJobPositions();
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadJobPositions();
  }

  onStatusChange(isOpen: boolean) {
    this.configTable = { ...initialConfigTable, isOpen };
    this.loadJobPositions();
  }

  async onDelete(jobPositionId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteJobPosition(jobPositionId);
      this.modal.success({
        nzContent: 'ลบตำแหน่งงานที่รับสมัครสำเร็จ',
      });
      this.loadJobPositions();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบตำแหน่งงานที่รับสมัครไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateJobPositionPriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadJobPositions();
    }
  }

  // #endregion
  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
