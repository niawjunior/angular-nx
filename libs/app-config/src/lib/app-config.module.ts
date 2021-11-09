import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const APP_ENV_CONFIG = new InjectionToken(
  'Common app environment settings.'
);

@NgModule({
  imports: [CommonModule],
})
export class AppConfigModule {}
