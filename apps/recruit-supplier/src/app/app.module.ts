import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import th from '@angular/common/locales/th';
registerLocaleData(th);

/** config ng-zorro-antd i18n **/
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import {
  APP_ENV_CONFIG,
  environment as customEnvironment,
} from '@recruit-supplier/app-config';
import { GlobalStoreModule } from '@recruit-supplier/global-store';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalStoreModule,
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
    { provide: APP_ENV_CONFIG, useValue: customEnvironment },
    { provide: NZ_I18N, useValue: th_TH },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
