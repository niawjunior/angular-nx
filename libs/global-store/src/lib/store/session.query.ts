import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { GlobalState } from './session.model';
import { GlobalStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class GlobalQuery extends Query<GlobalState> {
  pageLayout$ = this.select('pageLayout');

  constructor(protected store: GlobalStore) {
    super(store);
  }

  getPageLayout() {
    return this.getValue().pageLayout;
  }
}
