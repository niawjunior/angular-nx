import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiLayoutComponent } from './ui-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UiThemeModule } from '@recruit-supplier/ui-theme';
import { SharedModule } from '@recruit-supplier/shared';

@NgModule({
  imports: [CommonModule, RouterModule, UiThemeModule, SharedModule],
  declarations: [UiLayoutComponent, FooterComponent, HeaderComponent],
  exports: [UiLayoutComponent],
})
export class UiLayoutModule {}
