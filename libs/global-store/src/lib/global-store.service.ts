import { Injectable } from '@angular/core';
import { IPageLayout } from '@recruit-supplier/shared';
import { Subject } from 'rxjs';
import { IBreadcrumb } from './store/session.model';
import { GlobalQuery } from './store/session.query';
import { GlobalStore } from './store/session.store';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  breadcrumbSubject$: Subject<IBreadcrumb[]> = new Subject();

  constructor(
    private sessionStore: GlobalStore,
    private sessionQuery: GlobalQuery
  ) {}

  resetStore() {
    this.sessionStore.reset();
  }

  setPageLayout(pageLayout: IPageLayout | null) {
    this.sessionStore.update({ pageLayout: pageLayout });
  }
}
