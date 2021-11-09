import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleOtherPageContentComponent } from './module-other-page-content.component';
import { ModuleOtherPageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleOtherPageContentManageOtherPageContentIndexPageComponent } from './pages/manage-other-page-content-index/manage-other-page-content-index.page';
import { ModuleOtherPageContentManageOtherPageContentCreatePageComponent } from './pages/manage-other-page-content-create/manage-other-page-content-create.page';
import { ModuleOtherPageContentManageOtherPageContentUpdatePageComponent } from './pages/manage-other-page-content-update/manage-other-page-content-update.page';
import { EPageRoute } from '@recruit-supplier/router';
import { ModuleOtherPageContentCreatePageComponent } from './pages/create/create.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleOtherPageContentComponent,
    children: [
      {
        path: '',
        component: ModuleOtherPageContentIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleOtherPageContentCreatePageComponent,
      },
      {
        path: `:otherPageContentId/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}`,
        component:
          ModuleOtherPageContentManageOtherPageContentIndexPageComponent,
      },
      {
        path: `:otherPageContentId/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}/${EPageRoute.CREATE}`,
        component:
          ModuleOtherPageContentManageOtherPageContentCreatePageComponent,
      },
      {
        path: `:otherPageContentId/${EPageRoute.MANGE_OTHER_PAGE_CONTENT}/:manageOtherPageContentId/${EPageRoute.UPDATE}`,
        component:
          ModuleOtherPageContentManageOtherPageContentUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleOtherPageContentRoutingModule {}
