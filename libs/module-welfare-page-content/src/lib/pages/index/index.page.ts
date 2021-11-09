import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { IConfigWelfarePageContentTable } from '../../models/config-table.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleWelfarePageContentFacade } from '../../module-welfare-page-content-facade';

const initialConfigTable: IConfigWelfarePageContentTable = {
  welfarePageContents: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-welfare-page-content-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleWelfarePageContentIndexPageComponent
  implements OnInit, OnDestroy
{
  configTable: IConfigWelfarePageContentTable = initialConfigTable;

  constructor(
    private facade: ModuleWelfarePageContentFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าสวัสดิการ',
        route: EPageRoute.WELFARE_PAGE_CONTENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.WELFARE_PAGE_CONTENT,
    });
    this.loadWelfarePageContents();
  }

  async loadWelfarePageContents() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getWelfarePageContents();

      this.configTable = {
        ...this.configTable,
        welfarePageContents: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateWelfarePageContentPriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadWelfarePageContents();
    }
  }

  async onDelete(welfareContentId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteWelfarePageContentPriority(welfareContentId);
      this.modal.success({
        nzContent: 'ลบ เนื้อหาหน้าสวัสดิการสำร็จ',
      });
      this.loadWelfarePageContents();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ เนื้อหาหน้าสวัสดิการไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
