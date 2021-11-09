import { ActivatedRoute } from '@angular/router';
import { EFormMode } from '@recruit-supplier/app-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleRoleFacade } from '../../module-role-facade';
import { IRoleResponse } from '@recruit-supplier/api-role';
import { IRoleForm } from '../../models';

@Component({
  selector: 'recruit-supplier-module-role-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleRoleUpdatePageComponent implements OnInit, OnDestroy {
  isInitialLoading = false;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  roleId: string;
  role: IRoleResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleRoleFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'บทบาท',
        route: EPageRoute.ROLE,
      },
      {
        name: 'แก้ไขบทบาท',
        route: `${EPageRoute.ROLE}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.ROLE,
    });

    this.loadRoleById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadRoleById() {
    this.isInitialLoading = true;
    try {
      this.roleId = this.route.snapshot.paramMap.get('roleId');
      const response = await this.facade.getRoleById(this.roleId);
      this.role = response;
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.ROLE);
        },
      });
    }
  }

  async onUpdateRole(roleFormData: IRoleForm) {
    this.isLoading = true;
    const roleForm = {
      ...roleFormData,
      permissions: roleFormData.permissions
        ?.filter((item) => item.checked)
        ?.map((item) => item.value),
    };
    try {
      await this.facade.updateRole(this.roleId, roleForm);
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขบทบาทสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.ROLE);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขบทบาทไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
