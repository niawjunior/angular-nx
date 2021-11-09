import { EPageRoute } from '@recruit-supplier/router';

export interface IBreadcrumb {
  name: string;
  route: EPageRoute | string
}

export interface IPageLayout {
  activeMenu: EPageRoute;
  breadcrumbs: IBreadcrumb[];
  subMeneOpen?: EPageRoute;
}
