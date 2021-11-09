import { EPageRoute } from '@recruit-supplier/router';
import { IPageLayout } from '@recruit-supplier/shared';

export interface IBreadcrumb {
  name: string;
  route: EPageRoute;
}

export interface GlobalState {
  isInitialized: boolean;
  pageLayout: IPageLayout;
}
