import { EPageRoute } from '@recruit-supplier/router';

export interface IMenu {
  title: string;
  route: EPageRoute;
  submenus?: IMenu[];
  isNotFinished?: boolean;
}
