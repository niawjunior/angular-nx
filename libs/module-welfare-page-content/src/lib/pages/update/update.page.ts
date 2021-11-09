import { ActivatedRoute } from '@angular/router';
import { EFormMode } from '@recruit-supplier/app-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  IWelfarePageContent,
  IWelfarePageContentResponse,
} from '@recruit-supplier/api-welfare-page-content';
import { ModuleWelfarePageContentFacade } from '../../module-welfare-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-welfare-page-content-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleWelfarePageContentUpdatePageComponent
  implements OnInit, OnDestroy
{
  isInitialLoading = false;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  welfareContentId!: string;
  welfarePageContent!: IWelfarePageContentResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleWelfarePageContentFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าสวัสดิการ',
        route: EPageRoute.WELFARE_PAGE_CONTENT,
      },
      {
        name: 'แก้ไขเนื้อหาหน้าสวัสดิการ',
        route: `${EPageRoute.WELFARE_PAGE_CONTENT}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.ROLE,
    });

    this.loadWelfarePageContentById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadWelfarePageContentById() {
    this.isInitialLoading = true;
    try {
      this.welfareContentId = this.route.snapshot.paramMap.get(
        'welfareId'
      ) as string;
      const response = await this.facade.getWelfarePageContentById(
        this.welfareContentId
      );
      this.welfarePageContent = response;
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

  async onUpdateWelfarePageContent(
    welfareContentFormData: IWelfarePageContent
  ) {
    this.isLoading = true;

    try {
      await this.facade.updateWelfarePageContent(
        this.welfareContentId,
        welfareContentFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขเนื้อหาหน้าสวัสดิการสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.WELFARE_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขเนื้อหาหน้าสวัสดิการไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
