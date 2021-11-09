import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { EDefaultData } from '@recruit-supplier/app-config';
import { IConfigUserTable } from '../../models/config-table.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleUserFacade } from '../../module-user-facade';

const initialConfigTable: IConfigUserTable = {
  users: [],
  selectedType: '',
  rolesOptions: [],
  isLoading: false,
  currentPage: 1,
  pageSize: EDefaultData.PAGE_SIZE,
  total: 0,
  keyword: '',
};

@Component({
  selector: 'recruit-supplier-module-user-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleUserIndexPageComponent implements OnInit, OnDestroy {
  configTable: IConfigUserTable = initialConfigTable;
  constructor(
    private facade: ModuleUserFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.loadRolesOptions();

    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ผู้ใช้งาน',
        route: EPageRoute.USER,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.USER,
    });
  }
  async loadRolesOptions() {
    this.configTable.rolesOptions = await this.facade.getRoles();
  }

  onTypeChange(selectedType: string) {
    this.configTable = { ...initialConfigTable, selectedType };
    this.loadUsers();
  }

  async loadUsers() {
    this.configTable.isLoading = true;
    try {
      const {
        data,
        pageNumber: currentPage,
        pageSize: pageSize,
        totalRecords,
      } = await this.facade.getUsers({
        PageNumber: this.configTable.currentPage,
        PageSize: this.configTable.pageSize,
        keyword: this.configTable.keyword,
      });

      this.configTable = {
        ...this.configTable,
        users: data,
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
    this.loadUsers();
  }

  onSearch(keyword: string) {
    this.configTable.keyword = keyword;
    this.loadUsers();
  }

  async onDelete(roleId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteUser(roleId);
      this.modal.success({
        nzContent: 'ลบผู้ใช้งาน สำเร็จ',
      });
      this.loadUsers();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบผู้ใช้งาน ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
