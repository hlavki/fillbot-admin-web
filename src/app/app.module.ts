import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
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
import { HttpErrorInterceptor } from './core/interceptors/error.interceptor';
import { UserService } from './core/api/services/user/user.service';
import { ELanguage } from './core/api/enums/language.enum';

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
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [KeycloakService],
      useFactory: initializeKeycloak,
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { ...new MatDialogConfig(), width: '100%', maxWidth: '700px' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private readonly translateService: TranslateService,
    private readonly userService: UserService,
  ) {
    this.userService.getUserSettings().subscribe(
      (language: ELanguage) => {
        this.translateService.setDefaultLang('en');
        this.translateService.use(language.toLowerCase());
      }
    );
  }
}
