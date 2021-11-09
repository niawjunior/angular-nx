import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from '@recruit-supplier/global-store';

@Component({
  selector: 'recruit-supplier-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'recruit-supplier';
  constructor(private router: Router, private globalService: GlobalService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.globalService.setPageLayout(null);
      }
    });
  }
}
