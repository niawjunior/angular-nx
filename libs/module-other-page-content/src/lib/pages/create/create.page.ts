import { Component, OnDestroy, OnInit } from '@angular/core';
import { IOtherPageContent } from '@recruit-supplier/api-other-page-content';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleOtherPageContentFacade } from '../../module-other-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-other-page-content-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleOtherPageContentCreatePageComponent
  implements OnDestroy, OnInit
{
  isLoading = false;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleOtherPageContentFacade,
    private modal: NzModalService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าฝึกงาน',
        route: EPageRoute.OTHER_PAGE_CONTENT,
      },
      {
        name: 'เพิ่มเนื้อหาหน้าอื่นๆ',
        route: `${EPageRoute.OTHER_PAGE_CONTENT}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.OTHER_PAGE_CONTENT,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async onCreateOtherPageContent(otherPageContentFormData: IOtherPageContent) {
    this.isLoading = true;
    try {
      await this.facade.createOtherPageContent(otherPageContentFormData);
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มเนื้อหาหน้าฝึกงาน สำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.OTHER_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มเนื้อหาหน้าฝึกงาน ไม่สำเร็จ เนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
