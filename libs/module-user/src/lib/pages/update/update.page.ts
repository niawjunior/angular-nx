import { ActivatedRoute } from '@angular/router';
import { EFormMode } from '@recruit-supplier/app-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IUserForm } from '../../models';
import { IUserResponse } from '@recruit-supplier/api-user';
import { ModuleUserFacade } from '../../module-user-facade';
import { IRoleResponse } from '@recruit-supplier/api-role';

@Component({
  selector: 'recruit-supplier-module-user-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleUserUpdatePageComponent implements OnInit, OnDestroy {
  isInitialLoading = false;
  isLoading = false;
  rolesOptions: IRoleResponse[];
  formMode = EFormMode.UPDATE;
  userId: string;
  user: IUserResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleUserFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ผู้ใช้งาน',
        route: EPageRoute.USER,
      },
      {
        name: 'แก้ไขผู้ใช้งาน',
        route: `${EPageRoute.USER}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.USER,
    });

    this.loadUserById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadUserById() {
    this.isInitialLoading = true;
    try {
      this.userId = this.route.snapshot.paramMap.get('userId');
      const response = await this.facade.getUserById(this.userId);
      this.rolesOptions = [response.rolesModel];
      this.user = response;
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.USER);
        },
      });
    }
  }

  async onUpdateUser(userFormData: IUserForm) {
    this.isLoading = true;

    try {
      await this.facade.updateUser(this.userId, userFormData);
      this.modal.success({
        nzContent: 'แก้ไขผู้ใช้งานสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.USER);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขผู้ใช้งานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
