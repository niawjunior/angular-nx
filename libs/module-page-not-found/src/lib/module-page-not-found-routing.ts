import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulePageNotFoundComponent } from './module-page-not-found.component';
import { ModulePageNotFoundIndexPageComponent } from './pages/index/index.page';

/**
 * Module routes
 */
const routes: Routes = [
  {
    path: '',
    component: ModulePageNotFoundComponent,
    children: [
      {
        path: '',
        component: ModulePageNotFoundIndexPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulePageNotFoundRoutingModule {}
