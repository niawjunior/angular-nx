import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';
import { EPageRoute } from '@recruit-supplier/router';

@Component({
  selector: 'recruit-supplier-module-page-not-found-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModulePageNotFoundIndexPageComponent implements OnInit, OnDestroy {
  jobPositionUrl = EPageRoute.JOB_POSITION;

  constructor(private globalService: GlobalService) {}

  ngOnInit() {
    document.title =
      'ขออภัย, หน้าที่คุณต้องการไม่มีอยู่จริง หรือ ไม่มีสิทธิ์เข้าถึงเนื้อหาหน้านี้';
  }

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
