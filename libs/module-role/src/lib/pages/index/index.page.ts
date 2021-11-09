import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { EDefaultData } from '@recruit-supplier/app-config';
import { IConfigRoleTable } from '../../models/config-table.model';
import { ModuleRoleFacade } from '../../module-role-facade';
import { NzModalService } from 'ng-zorro-antd/modal';

const initialConfigTable: IConfigRoleTable = {
  roles: [],
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};

@Component({
  selector: 'recruit-supplier-module-role-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleRoleIndexPageComponent implements OnInit, OnDestroy {
  configTable: IConfigRoleTable = initialConfigTable;

  constructor(
    private facade: ModuleRoleFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'บทบาท',
        route: EPageRoute.ROLE,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.ROLE,
    });
  }

  async loadRoles() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getRoles({
        PageNumber: this.configTable.currentPage,
        PageSize: this.configTable.pageSize,
        keyword: this.configTable.keyword,
      });

      this.configTable = {
        ...this.configTable,
        roles: data,
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
    this.loadRoles();
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadRoles();
  }

  async onDelete(roleId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteRole(roleId);
      this.modal.success({
        nzContent: 'ลบ บทบาทสำเร็จ',
      });
      this.loadRoles();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ บทบาทไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
