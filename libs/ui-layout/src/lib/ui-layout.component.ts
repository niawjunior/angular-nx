import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ObserverComponent } from '@recruit-supplier/utils/observer-component';
import { GlobalQuery } from '@recruit-supplier/global-store';
import { IBreadcrumb } from '@recruit-supplier/shared';
import { EPageRoute } from '@recruit-supplier/router';
import { IMenu } from './models/menu.model';
@Component({
  selector: 'recruit-supplier-app-ui-layout',
  templateUrl: './ui-layout.component.html',
  styleUrls: ['./ui-layout.component.scss'],
})
export class UiLayoutComponent
  extends ObserverComponent
  implements OnInit, AfterViewChecked
{
  menus: IMenu[] = [
    {
      title: 'ตำแหน่งงานที่รับสมัคร',
      route: EPageRoute.JOB_POSITION,
    },
    {
      title: 'แนะนำตำแหน่งงานให้ต้นสังกัด',
      route: EPageRoute.RECOMMEND_JOB_POSITION_TO_AGENCY,
    },
    {
      title: 'ผู้สมัครงาน / ฝึกงาน',
      route: EPageRoute.JOB_APPLICANT_INTERNSHIP,
      isNotFinished: true,
    },
    {
      title: 'เนื้อหาหน้าแรก',
      route: EPageRoute.HOME_MANAGEMENT,
      submenus: [
        {
          title: 'ภาพป๊อบอัพ',
          route: EPageRoute.HOME_MANAGEMENT_POPUP_IMAGE,
        },
        {
          title: 'ข่าวประชาสัมพันธ์ (ตัววิ่ง)',
          route: EPageRoute.HOME_MANAGEMENT_ANNOUNCEMENT,
        },
        {
          title: 'ภาพสไลด์หลัก',
          route: EPageRoute.HOME_MANAGEMENT_MAIN_SLIDE_IMAGE,
        },
        {
          title: 'ภาพสายรถไฟฟ้า',
          route: EPageRoute.HOME_MANAGEMENT_PHOTO_OF_ELECTRIC_TRAIN,
        },
        {
          title: 'วัฒนธรรมองค์กร',
          route: EPageRoute.HOME_MANAGEMENT_CORPORATE_CULTURE,
        },
      ],
    },
    {
      title: 'เนื้อหาหน้าฝึกงาน',
      route: EPageRoute.INTERNSHIP_PAGE_CONTENT,
    },
    {
      title: 'เนื้อหาหน้ากิจกรรมพนักงาน',
      route: EPageRoute.EMPLOYEE_ACTIVITY_PAGE_CONTENT,
      isNotFinished: true,
    },
    {
      title: 'เนื้อหาหน้าสวัสดิการ',
      route: EPageRoute.WELFARE_PAGE_CONTENT,
    },
    {
      title: 'เนื้อหาหน้าอื่นๆ',
      route: EPageRoute.OTHER_PAGE_CONTENT,
    },
    {
      title: 'บทบาท',
      route: EPageRoute.ROLE,
    },
    {
      title: 'ผู้ใช้งาน',
      route: EPageRoute.USER,
    },
    {
      title: 'ข้อมูล Master',
      route: EPageRoute.MASTER_INFORMATION,
    },
  ];

  breadcrumbs: IBreadcrumb[] = [];
  activeMenu: EPageRoute;
  submenuOpen?: EPageRoute;

  constructor(
    private globalQuery: GlobalQuery,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.observe(this.globalQuery.pageLayout$, (value) => {
      if (value) {
        this.breadcrumbs = value.breadcrumbs;
        this.activeMenu = value.activeMenu;
        this.submenuOpen = value.subMeneOpen;
        if (this.breadcrumbs.length) {
          document.title = this.breadcrumbs[this.breadcrumbs.length - 1].name;
        }
      } else {
        this.breadcrumbs = [];
      }
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
