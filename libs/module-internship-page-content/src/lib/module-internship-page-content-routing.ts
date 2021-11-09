import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EPageRoute } from '@recruit-supplier/router';

import { ModuleInternshipPageContentIndexPageComponent } from './pages/index/index.page';
import { ModuleInternshipPageContentComponent } from './module-internship-page-content.component';
import { ModuleInternshipPageContentCreatePageComponent } from './pages/create/create.page';
import { ModuleInternshipPageContentUpdatePageComponent } from './pages/update/update.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModuleInternshipPageContentComponent,
    children: [
      {
        path: '',
        component: ModuleInternshipPageContentIndexPageComponent,
      },
      {
        path: EPageRoute.CREATE,
        component: ModuleInternshipPageContentCreatePageComponent,
      },
      {
        path: `:internshipId/${EPageRoute.UPDATE}`,
        component: ModuleInternshipPageContentUpdatePageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleInternshipPageContentRoutingModule {}
