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
  constructor(
    private readonly translateService: TranslateService,
    private readonly userService: UserService,
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.loadLanguage().pipe(
      map((language: ELanguage | null) => {
        if (language) {
          this.translateService.setDefaultLang(language.toLocaleLowerCase());
        }
        return true;
      }),
    );
  }
}
