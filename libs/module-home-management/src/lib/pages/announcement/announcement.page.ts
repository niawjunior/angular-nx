import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IAnnouncement } from '@recruit-supplier/api-home-management';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';
import { IBreadcrumb, IDropParams } from '@recruit-supplier/shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { IConfigAnnouncementTable } from '../../models';
import { ModuleHomeManagementFacade } from '../../module-home-management-facade';

const initialConfigTable: IConfigAnnouncementTable = {
  announcements: [],
  isLoading: false,
};
@Component({
  selector: 'recruit-supplier-module-home-management-announcement-page',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class ModuleHomeManagementAnnouncementPageComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  configTable: IConfigAnnouncementTable = initialConfigTable;
  submittedAnnouncementSubscription?: Subscription;

  constructor(
    private globalService: GlobalService,
    private facade: ModuleHomeManagementFacade,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    const breadcrumbs: IBreadcrumb[] = [
      {
        name: 'เนื้อหาหน้าแรก',
        route: EPageRoute.HOME_MANAGEMENT_ANNOUNCEMENT,
      },
    ];
    this.globalService.setPageLayout({
      breadcrumbs,
      activeMenu: EPageRoute.HOME_MANAGEMENT_ANNOUNCEMENT,
      subMeneOpen: EPageRoute.HOME_MANAGEMENT,
    });

    this.loadAnnouncements();
  }
  ngOnDestroy() {
    this.globalService.setPageLayout(null);
    this.submittedAnnouncementSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    this.submittedAnnouncementSubscription =
      this.facade.onSubmittedAnnouncementSubject$.subscribe((value) => {
        console.log(value)
        if (!value?.id) {
          this.createAnnouncement(value);
        } else {
          this.updateAnnouncement(value);
        }
      });
  }

  async loadAnnouncements() {
    this.configTable.isLoading = true;
    try {
      const data = await this.facade.getAnnouncements();

      this.configTable = {
        ...this.configTable,
        announcements: data,
        isLoading: false,
      };
    } catch (error) {
      console.error(error);
      this.configTable.isLoading = false;
    }
  }

  async onDelete(announcementId: string) {
    try {
      this.configTable.isLoading = true;
      await this.facade.deleteAnnouncement(announcementId);
      this.modal.success({
        nzContent: 'ลบ ข่าวประชาสัมพันธ์สำเร็จ',
      });
      this.loadAnnouncements();
    } catch (error) {
      console.error(error);
      this.modal.error({
        nzContent: `ลบ ข่าวประชาสัมพันธ์ไม่สำเร็จเนื่องจาก ...`,
      });
    } finally {
      this.configTable.isLoading = false;
    }
  }

  async onEdit(announcementId: string) {
    try {
      const result = await this.facade.getAnnouncementById(announcementId);
      this.facade.onVisibleAnnouncementSubject$.next({
        isOpen: true,
        data: result,
      });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ข่าวประชาสัมพันธ์ เนื่องจาก ...',
      });
    }
  }

  async onPriorityChange(event: IDropParams) {
    try {
      this.configTable.isLoading = true;
      await this.facade.updateAnnouncementPriority(event);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadAnnouncements();
    }
  }

  async createAnnouncement(announcementForm: IAnnouncement) {
    try {
      await this.facade.createAnnouncement(announcementForm);
      this.modal.success({
        nzContent: 'เพิ่มข่าวประชาสัมพันธ์ สำเร็๗',
      });
      this.loadAnnouncements();
      this.facade.onVisibleAnnouncementSubject$.next({ isOpen: false });
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'เพิ่ม ข่าวประชาสัมพันธ์ เนื่องจาก ...',
      });
    }
  }

  async updateAnnouncement(announcementForm: IAnnouncement) {
    console.log(announcementForm)
    try {
      if (announcementForm?.id) {
        await this.facade.updateAnnouncement(
          announcementForm.id,
          announcementForm
        );
        this.modal.success({
          nzContent: 'แก้ไข ข่าวประชาสัมพันธ์',
        });
        this.loadAnnouncements();
        this.facade.onVisibleAnnouncementSubject$.next({ isOpen: false });
      }
    } catch (e) {
      console.log(e);
      this.modal.error({
        nzContent: 'แก้ไข ข่าวประชาสัมพันธ์ เนื่องจาก ...',
      });
    }
  }
}
