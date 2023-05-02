import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, BehaviorSubject, map, tap, of, filter, from, switchMap } from 'rxjs';

import { ISettingDto } from '../../interfaces/setting-dto.interface';
import { ELanguage } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL: string = '/api/user';

  private readonly language$: BehaviorSubject<ELanguage> = new BehaviorSubject<ELanguage>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly keycloakService: KeycloakService,
    private readonly translateService: TranslateService,
  ) {
    this.language$.asObservable().pipe(
      filter((language: ELanguage) => !!language),
    ).subscribe((language: ELanguage) => this.translateService.use(language.toLowerCase()));
  }

  getLanguage(): Observable<ELanguage> {
    return this.language$.asObservable();
  }

  loadLanguage(): Observable<ELanguage> {
    return from(this.keycloakService.isLoggedIn()).pipe(
      switchMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.http.get<ISettingDto>(`${this.BASE_URL}/settings`).pipe(
            map((setting: ISettingDto) => setting?.settings?.language || ELanguage.EN),
            tap((language: ELanguage) => this.language$.next(language)),
          )
        }
        return of(ELanguage.EN);
      }),
    )
  }

  updateUserSettings(setting: ISettingDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/settings`, setting).pipe(
      tap(() => this.language$.next(setting.settings.language || this.language$.value)),
    );
  }

  setUserSettings(setting: ISettingDto): void {
    this.language$.next(setting.settings.language || this.language$.value);
  }
}
