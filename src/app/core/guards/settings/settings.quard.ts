import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

import { UserService } from '@fb/core/api/services/user/user.service';
import { ELanguage } from '@fb/core/api/enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class SettingsGuard implements CanActivate {
  private readonly ALLOWED_TRANSLATIONS: string[] = ['cs', 'sk'];

  constructor(
    private readonly translateService: TranslateService,
    private readonly userService: UserService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.loadLanguage().pipe(
      map((language: ELanguage | null) => {
        if (language) {
          this.translateService.setDefaultLang(language.toLocaleLowerCase());
        } else {
          if (this.ALLOWED_TRANSLATIONS.includes(navigator.language.substring(0, 2))) {
            this.translateService.setDefaultLang(navigator.language.substring(0, 2));
          } else {
            this.translateService.setDefaultLang('en');
          }
        }
        return true;
      }),
    );
  }
}
