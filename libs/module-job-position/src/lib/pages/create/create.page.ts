import { Component, OnDestroy, OnInit } from '@angular/core';
import { IJobPosition } from '@recruit-supplier/api-job-position';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleJobPositionFacade } from '../../module-job-position-facade';

@Component({
  selector: 'recruit-supplier-module-job-position-create-page',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class ModuleJobPositionCreatePageComponent implements OnInit, OnDestroy {
  isLoading = false;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleJobPositionFacade,
    private modal: NzModalService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ตำแหน่งงานที่รับสมัคร',
        route: EPageRoute.JOB_POSITION,
      },
      {
        name: 'เพิ่มตำแหน่งงานที่รับสมัคร',
        route: `${EPageRoute.JOB_POSITION}/${EPageRoute.CREATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.JOB_POSITION,
    });
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async onCreateJobPosition(jobPositionFormData: IJobPosition) {
    this.isLoading = true;
    const jobForm = {
      ...jobPositionFormData,
      priority: Number(jobPositionFormData.priority),
    };
    try {
      await this.facade.createJobPosition(jobForm);
      this.modal.success({
        nzClosable: false,
        nzContent: 'เพิ่มตำแหน่งงานที่รับสมัครสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.JOB_POSITION);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `เพิ่มตำแหน่งงานที่รับสมัครไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
