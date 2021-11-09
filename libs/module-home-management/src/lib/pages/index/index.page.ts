import { Component, OnDestroy } from '@angular/core';
import { GlobalService } from '@recruit-supplier/global-store';

@Component({
  selector: 'recruit-supplier-module-home-management-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class ModuleHomeManagementIndexPageComponent  implements OnDestroy {
 constructor(private globalService: GlobalService) {}

  ngOnDestroy() {
    this.globalService.setPageLayout(null);
  }
}
