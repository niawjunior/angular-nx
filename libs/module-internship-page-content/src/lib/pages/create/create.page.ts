import { Component, OnDestroy, OnInit } from '@angular/core';
import { IInternshipPageContent } from '@recruit-supplier/api-internship-page-content';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleInternshipPageContentFacade } from '../../module-internship-page-content-facade';
@Component({
  selector: 'recruit-supplier-module-internship-page-content-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleInternshipPageContentCreatePageComponent
  implements OnInit, OnDestroy
{
  constructor(
    private globalService: GlobalService,
    private modal: NzModalService,
    private routerService: RouterService,
    private facade: ModuleInternshipPageContentFacade
  ) {}

  isLoading = false;

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าฝึกงาน',
        route: EPageRoute.INTERNSHIP_PAGE_CONTENT,
      },
      {
        name: 'เพิ่มเนื้อหาหน้าฝึกงาน',
        route: `${EPageRoute.INTERNSHIP_PAGE_CONTENT}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.INTERNSHIP_PAGE_CONTENT,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async onCreateInternshipPageContent(
    internshipContentFormData: IInternshipPageContent
  ) {
    this.isLoading = true;

    try {
      await this.facade.createInternshipPageContent(internshipContentFormData);
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มเนื้อหาหน้าฝึกงานสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.INTERNSHIP_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มเนื้อหาหน้าฝึกงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
