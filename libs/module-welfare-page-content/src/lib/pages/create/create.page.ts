import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWelfarePageContent } from '@recruit-supplier/api-welfare-page-content';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleWelfarePageContentFacade } from '../../module-welfare-page-content-facade';
@Component({
  selector: 'recruit-supplier-module-welfare-page-content-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleWelfarePageContentCreatePageComponent
  implements OnInit, OnDestroy
{
  constructor(
    private globalService: GlobalService,
    private modal: NzModalService,
    private routerService: RouterService,
    private facade: ModuleWelfarePageContentFacade
  ) {}

  isLoading = false;

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าสวัสดิการ',
        route: EPageRoute.WELFARE_PAGE_CONTENT,
      },
      {
        name: 'เพิ่มเนื้อหาหน้าสวัสดิการ',
        route: `${EPageRoute.WELFARE_PAGE_CONTENT}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.WELFARE_PAGE_CONTENT,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async onCreateWelfarePageContent(
    welfareContentFormData: IWelfarePageContent
  ) {
    this.isLoading = true;

    try {
      await this.facade.createWelfarePageContent(welfareContentFormData);
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มเนื้อหาหน้าสวัสดิการสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.WELFARE_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มเนื้อหาหน้าสวัสดิการไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
