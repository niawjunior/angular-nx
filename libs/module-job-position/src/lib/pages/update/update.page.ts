import { ActivatedRoute } from '@angular/router';
import {
  IJobPosition,
  IJobPositionResponse,
} from '@recruit-supplier/api-job-position';
import { EFormMode } from '@recruit-supplier/app-config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute, RouterService } from '@recruit-supplier/router';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModuleJobPositionFacade } from '../../module-job-position-facade';

@Component({
  selector: 'recruit-supplier-module-job-position-update-page',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class ModuleJobPositionUpdatePageComponent implements OnInit, OnDestroy {
  isInitialLoading = false;
  isLoading = false;

  formMode = EFormMode.UPDATE;
  jobPositionId: string;
  jobPosition: IJobPositionResponse;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleJobPositionFacade,
    private routerService: RouterService,
    private modal: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'ตำแหน่งงานที่รับสมัคร',
        route: EPageRoute.JOB_POSITION,
      },
      {
        name: 'แก้ไขตำแหน่งงานที่รับสมัคร',
        route: `${EPageRoute.JOB_POSITION}/${EPageRoute.UPDATE}`,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.JOB_POSITION,
    });

    this.loadJobPositionById();
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }

  async loadJobPositionById() {
    this.isInitialLoading = true;
    try {
      this.jobPositionId = this.route.snapshot.paramMap.get('jobPositionId');
      const response = await this.facade.getJobPositionById(this.jobPositionId);
      this.jobPosition = response.data;
      this.isInitialLoading = false;
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: 'ไม่สามารถโหลดข้อมูลได้',
        nzClosable: false,
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.JOB_POSITION);
        },
      });
    }
  }

  async onUpdateJobPosition(jobPositionFormData: IJobPosition) {
    this.isLoading = true;
    const jobForm = {
      ...jobPositionFormData,
      priority: Number(jobPositionFormData.priority),
      id: this.jobPositionId,
    };
    try {
      await this.facade.updateJobPosition(this.jobPositionId, jobForm);
      this.modal.success({
        nzClosable: false,
        nzContent: 'แก้ไขตำแหน่งงานที่รับสมัครสำเร็จ',
        nzOnOk: () => {
          this.routerService.goTo(EPageRoute.JOB_POSITION);
        },
      });
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `แก้ไขตำแหน่งงานที่รับสมัครไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
