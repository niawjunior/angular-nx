import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@recruit-supplier/shared';

/**
 * Import component
 */
import { ModulePageNotFoundComponent } from './module-page-not-found.component';

/**
 * Import router module
 */
import { ModulePageNotFoundRoutingModule } from './module-page-not-found-routing';

/**
 * Import pages
 */
import { ModulePageNotFoundIndexPageComponent } from './pages/index/index.page';

@NgModule({
  declarations: [
    ModulePageNotFoundComponent,
    ModulePageNotFoundIndexPageComponent,
  ],
  imports: [CommonModule, ModulePageNotFoundRoutingModule, SharedModule],
})
export class PageNotFoundModule {}
