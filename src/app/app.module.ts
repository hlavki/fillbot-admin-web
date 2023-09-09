import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { httpLoaderFactory } from '@core/utils/httpLoaderFactory';
import { initializeKeycloak } from '@core/utils/initKeycloak';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from '@core/interceptors/error.interceptor';

import localeCs from '@angular/common/locales/cs';
import localeSk from '@angular/common/locales/sk';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCs, 'cs');
registerLocaleData(localeSk, 'sk');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
      isolate: true,
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [KeycloakService],
      useFactory: initializeKeycloak,
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {...new MatDialogConfig(), width: '100%', maxWidth: '700px'}},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  private readonly ALLOWED_TRANSLATIONS: string[] = ['cs', 'sk'];

  constructor(
    private readonly translateService: TranslateService,
  ) {
    if (this.ALLOWED_TRANSLATIONS.includes(navigator.language.substring(0, 2))) {
      this.translateService.setDefaultLang(navigator.language.substring(0, 2));
    } else {
      this.translateService.setDefaultLang('en');
    }
  }
}
