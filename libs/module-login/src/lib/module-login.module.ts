import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModuleLoginComponent } from './module-login.component';
import { ModuleLandingRoutingModule } from './module-login-routing';
import { SharedModule } from '@recruit-supplier/shared';
import { ModuleLoginIndexPageComponent } from './pages/index/index.page';

@NgModule({
  declarations: [ModuleLoginComponent, ModuleLoginIndexPageComponent],
  imports: [
    CommonModule,
    ModuleLandingRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ModuleLoginModule {}
