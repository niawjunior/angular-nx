import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IRoleForm } from '../../models';
import { ModuleRoleFacade } from '../../module-role-facade';
@Component({
  selector: 'recruit-supplier-module-role-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleRoleCreatePageComponent implements OnInit, OnDestroy {
  isLoading = false;

  constructor(
    private globalService: GlobalService,
    private modal: NzModalService,
    private routerService: RouterService,
    private facade: ModuleRoleFacade
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'บทบาท',
        route: EPageRoute.ROLE,
      },
      {
        name: 'เพิ่มบทบาท',
        route: `${EPageRoute.ROLE}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.ROLE,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async onCreateRole(roleFormData: IRoleForm) {
    this.isLoading = true;
    const roleForm = {
      ...roleFormData,
      permissions: roleFormData.permissions
        ?.filter((item) => item.checked)
        ?.map((item) => item.value),
    };
    try {
      await this.facade.createRole(roleForm);
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มบทบาทสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.ROLE);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มบทบาทไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
