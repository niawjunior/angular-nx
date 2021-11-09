import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRoleResponse } from '@recruit-supplier/api-role';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IUserForm } from '../../models';
import { ModuleUserFacade } from '../../module-user-facade';
@Component({
  selector: 'recruit-supplier-module-user-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleUserCreatePageComponent implements OnInit, OnDestroy {
  isLoading = false;
  rolesOptions: IRoleResponse[];
  departmentThOptions: string[];
  constructor(
    private globalService: GlobalService,
    private modal: NzModalService,
    private routerService: RouterService,
    private facade: ModuleUserFacade
  ) {}

  ngOnInit() {
    this.loadRolesOptions();
    this.loadDepartmentThOptions();
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ผู้ใช้งาน',
        route: EPageRoute.USER,
      },
      {
        name: 'เพิ่มผู้ใช้งาน',
        route: `${EPageRoute.USER}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.USER,
    });
  }

  async loadRolesOptions() {
    this.rolesOptions = await this.facade.getRoles();
  }

  async loadDepartmentThOptions() {
    this.departmentThOptions = await this.facade.getDepartmentThOptions();
  }

  async onCreateUser(userFormData: IUserForm) {
    this.isLoading = true;
    try {
      await this.facade.createUser(userFormData);
      this.modal.success({
        nzContent: 'เพิ่มผู้ใช้งานสำเร็จ',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.USER);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มผู้ใช้งานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
