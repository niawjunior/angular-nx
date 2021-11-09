import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IConfigOtherPageContent } from '../../models';
import { ModuleOtherPageContentFacade } from '../../module-other-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-other-page-content-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleOtherPageContentIndexPageComponent
  implements OnDestroy, OnInit
{
  configTable: IConfigOtherPageContent = {
    isLoading: false,
    otherPageContents: [],
  };

  constructor(
    private facade: ModuleOtherPageContentFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าอื่นๆ',
        route: EPageRoute.OTHER_PAGE_CONTENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.OTHER_PAGE_CONTENT,
    });
    this.loadOtherPageContents();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadOtherPageContents() {
    this.configTable.isLoading = true;
    try {
      const otherPageContents = await this.facade.getOtherPageContents();

      this.configTable = {
        ...this.configTable,
        otherPageContents: otherPageContents,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(otherPageContentId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteOtherPageContent(otherPageContentId);
      this.modal.success({
        nzContent: 'ลบเนื้อหาหน้าอื่นๆ สำเร็จ',
      });
      this.loadOtherPageContents();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบเนื้อหาหน้าอื่นๆ ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }
}
