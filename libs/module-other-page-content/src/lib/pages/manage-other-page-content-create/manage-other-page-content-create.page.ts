import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IManageOtherPageContent,
  IOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleOtherPageContentFacade } from '../../module-other-page-content-facade';

@Component({
  selector:
    'recruit-supplier-module-other-page-content-manage-other-page-content-create-page',
  templateUrl: './manage-other-page-content-create.page.html',
  styleUrls: ['./manage-other-page-content-create.page.scss'],
})
export class ModuleOtherPageContentManageOtherPageContentCreatePageComponent
  implements OnDestroy, OnInit
{
  isLoading = false;
  otherPageContentId = '';
  otherPageContent: IOtherPageContentResponse = {} as IOtherPageContentResponse;
  isInitialLoading = true;

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
        name: 'เพิ่มหัวข้อ',
        route: EPageRoute.MANGE_OTHER_PAGE_CONTENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.OTHER_PAGE_CONTENT,
    });
    this.loadOtherPageContentById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadOtherPageContentById() {
    try {
      this.otherPageContent = await this.facade.getOtherPageContentById(
        this.otherPageContentId
      );
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

  async onCreateManageOtherPageContent(
    manageOtherPageContentFormData: IManageOtherPageContent
  ) {
    this.isLoading = true;
    try {
      await this.facade.createManageOtherPageContent(
        this.otherPageContentId,
        manageOtherPageContentFormData
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพื่มหัวข้อสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(this.parentUrl as EPageRoute);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มหัวข้อไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
