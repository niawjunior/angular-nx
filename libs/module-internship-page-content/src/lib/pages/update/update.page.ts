import { ActivatedRoute } from '@angular/router';
import { EFormMode } from '@recruit-supplier/app-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  IInternshipPageContent,
  IInternshipPageContentResponse,
} from '@recruit-supplier/api-internship-page-content';
import { ModuleInternshipPageContentFacade } from '../../module-internship-page-content-facade';

@Component({
  selector: 'recruit-supplier-module-internship-page-content-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleInternshipPageContentUpdatePageComponent
  implements OnInit, OnDestroy
{
  isInitialLoading = false;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  internshipContentId: string;
  internship!: IInternshipPageContentResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleInternshipPageContentFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าฝึกงาน',
        route: EPageRoute.INTERNSHIP_PAGE_CONTENT,
      },
      {
        name: 'แก้ไขหน้าฝึกงาน',
        route: `${EPageRoute.INTERNSHIP_PAGE_CONTENT}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.INTERNSHIP_PAGE_CONTENT,
    });

    this.loadInternshipById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadInternshipById() {
    this.isInitialLoading = true;
    try {
      this.internshipContentId = this.route.snapshot.paramMap.get(
        'internshipId'
      ) as string;
      const response = await this.facade.getInternshipPageContentById(
        this.internshipContentId
      );
      this.internship = response;
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.INTERNSHIP_PAGE_CONTENT);
        },
      });
    }
  }

  async onUpdateInternshipPageContent(
    internshipContentFormData: IInternshipPageContent
  ) {
    this.isLoading = true;
    try {
      await this.facade.updateInternshipPageContent(
        this.internshipContentId,
        internshipContentFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขเนื้อหาหน้าฝึกงานสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.INTERNSHIP_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขเนื้อหาหน้าฝึกงานไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
