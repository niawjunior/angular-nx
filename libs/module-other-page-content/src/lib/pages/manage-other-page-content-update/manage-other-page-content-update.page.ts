import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IManageOtherPageContent,
  IManageOtherPageContentResponse,
  IOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { EFormMode } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleOtherPageContentFacade } from '../../module-other-page-content-facade';

@Component({
  selector:
    'recruit-supplier-module-other-page-content-manage-other-page-content-update-page',
  templateUrl: './manage-other-page-content-update.page.html',
  styleUrls: ['./manage-other-page-content-update.page.scss'],
})
export class ModuleOtherPageContentManageOtherPageContentUpdatePageComponent
  implements OnDestroy, OnInit
{
  isLoading = false;
  otherPageContentId = '';
  manageOtherPageContentId = '';
  otherPageContent: IOtherPageContentResponse = {} as IOtherPageContentResponse;
  manageOtherPageContent: IManageOtherPageContentResponse =
    {} as IManageOtherPageContentResponse;
  isInitialLoading = true;
  formMode = EFormMode.UPDATE;

  get parentUrl() {
    return `${EPageRoute.OTHER_PAGE_CONTENT}/${this.otherPageContentId}/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}`;
  }

  constructor(
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private facade: ModuleOtherPageContentFacade,
    private modal: NzModalService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.otherPageContentId = this.route.snapshot.paramMap.get(
      'otherPageContentId'
    ) as string;
    this.manageOtherPageContentId = this.route.snapshot.paramMap.get(
      'manageOtherPageContentId'
    ) as string;
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าอื่นๆ',
        route: EPageRoute.OTHER_PAGE_CONTENT,
      },
      {
        name: 'จัดการเนื้อหาหน้าอื่นๆ',
        route: this.parentUrl,
      },
      {
        name: 'แก้ไขหัวข้อ',
        route: EPageRoute.MANGE_OTHER_PAGE_CONTENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.OTHER_PAGE_CONTENT,
    });
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadInitialData() {
    try {
      const otherPageContentRequest = this.facade.getOtherPageContentById(
        this.otherPageContentId
      );
      const manageOtherPageContentRequest =
        this.facade.getManageOtherPageContentById(
          this.otherPageContentId,
          this.manageOtherPageContentId
        );
      this.manageOtherPageContent = await manageOtherPageContentRequest;
      this.otherPageContent = await otherPageContentRequest;
      this.isInitialLoading = false;
    } catch (error) {
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.OTHER_PAGE_CONTENT);
        },
      });
    }
  }

  async onUpdateManageOtherPageContent(
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    this.isLoading = true;
    try {
      await this.facade.updateManageOtherPageContent(
        this.otherPageContentId,
        this.manageOtherPageContentId,
        manageOtherPageContentFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขหัวข้อสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(this.parentUrl as EPageRoute);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขหัวข้อไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
