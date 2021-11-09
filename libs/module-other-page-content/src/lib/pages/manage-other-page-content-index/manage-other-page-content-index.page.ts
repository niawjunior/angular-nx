import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IOtherPageContent,
  IOtherPageContentResponse,
} from '@recruit-supplier/api-other-page-content';
import { EFormMode } from '@recruit-supplier/app-config';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IConfigManageOtherPageContent } from '../../models';
import { ModuleOtherPageContentFacade } from '../../module-other-page-content-facade';

@Component({
  selector:
    'recruit-supplier-module-other-page-content-manage-other-page-content-index-page',
  templateUrl: './manage-other-page-content-index.page.html',
  styleUrls: ['./manage-other-page-content-index.page.scss'],
})
export class ModuleOtherPageContentManageOtherPageContentIndexPageComponent
  implements OnDestroy, OnInit
{
  isInitialLoading = true;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  otherPageContentId = '';
  otherPageContent!: IOtherPageContentResponse;

  configTable: IConfigManageOtherPageContent = {
    manageOtherPageContents: [],
    isLoading: false,
  };

  constructor(
    private globalService: GlobalService,
    private facade: ModuleOtherPageContentFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าอื่นๆ',
        route: EPageRoute.OTHER_PAGE_CONTENT,
      },
      {
        name: 'จัดการเนื้อหาหน้าอื่นๆ',
        route: `${EPageRoute.OTHER_PAGE_CONTENT}/${this.otherPageContentId}/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}`,
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
    this.isInitialLoading = true;
    try {
      this.otherPageContentId = this.route.snapshot.paramMap.get(
        'otherPageContentId'
      ) as string;
      const response = await this.facade.getOtherPageContentById(
        this.otherPageContentId
      );
      this.otherPageContent = response;
      await this.loadManageOtherPageContents();
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.OTHER_PAGE_CONTENT);
        },
      });
    }
  }

  async onUpdateOtherPageContent(otherPageContentFormData: IOtherPageContent) {
    this.isLoading = true;
    const otherPageContentForm = {
      ...otherPageContentFormData,
      id: this.otherPageContentId,
    };
    try {
      await this.facade.updateOtherPageContent(
        this.otherPageContentId,
        otherPageContentForm
      );
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขเนื้อหาหน้าอื่นๆ สำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.OTHER_PAGE_CONTENT);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขเนื้อหาหน้าอื่นๆ ไม่สำเร็จ เนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }

  // #region manage other page content
  async loadManageOtherPageContents() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getManageOtherPageContents(
        this.otherPageContentId
      );

      this.configTable = {
        ...this.configTable,
        manageOtherPageContents: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(manageOtherPageContentId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteManageOtherPageContent(
        this.otherPageContentId,
        manageOtherPageContentId
      );
      this.modal.success({
        nzContent: 'ลบ หัวข้อสำเร็จ',
      });
      this.loadManageOtherPageContents();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ หัวข้อไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateManagePageContentPriority(
        this.otherPageContentId,
        event
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.loadManageOtherPageContents();
    }
  }
}
