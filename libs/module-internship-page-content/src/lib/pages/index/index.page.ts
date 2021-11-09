import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { IConfigInternshipPageContentTable } from '../../models/config-table.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleInternshipPageContentFacade } from '../../module-internship-page-content-facade';

const initialConfigTable: IConfigInternshipPageContentTable = {
  internshipPageContents: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-internship-page-content-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleInternshipPageContentIndexPageComponent
  implements OnInit, OnDestroy
{
  configTable: IConfigInternshipPageContentTable = initialConfigTable;

  constructor(
    private facade: ModuleInternshipPageContentFacade,
    private globalService: GlobalService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าฝึกงาน',
        route: EPageRoute.INTERNSHIP_PAGE_CONTENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.INTERNSHIP_PAGE_CONTENT,
    });
    this.loadInternshipPageContents();
  }

  async loadInternshipPageContents() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getInternshipPageContents();

      this.configTable = {
        ...this.configTable,
        internshipPageContents: data,
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
      await this.facade.updateInternshipPageContentPriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadInternshipPageContents();
    }
  }

  async onDelete(internshipContentId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteInternshipPageContentPriority(
        internshipContentId
      );
      this.modal.success({
        nzContent: 'ลบ เนื้อหาหน้าฝึกงานสำร็จ',
      });
      this.loadInternshipPageContents();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ เนื้อหาหน้าฝึกงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
