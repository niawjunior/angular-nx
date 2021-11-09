import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EPageRoute } from './page-route';
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}
  goTo(route: EPageRoute, options: NavigationExtras = {}) {
    this.router.navigate([route], options);
  }

  goToDynamicUrl(routeFragments: unknown[], options: NavigationExtras = {}) {
    this.router.navigate(routeFragments, options);
  }
}