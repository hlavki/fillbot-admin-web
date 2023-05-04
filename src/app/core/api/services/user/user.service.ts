import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, map, tap, filter } from 'rxjs';

import { ISettingDto } from '../../interfaces/setting-dto.interface';
import { ELanguage } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL: string = '/api/user';

  private readonly language$: BehaviorSubject<ELanguage> = new BehaviorSubject<ELanguage>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService,
  ) {
    this.language$.asObservable().pipe(
      filter((language: ELanguage) => !!language),
    ).subscribe((language: ELanguage) => this.translateService.use(language.toLowerCase()));
  }

  getLanguage(): Observable<ELanguage> {
    return this.language$.asObservable();
  }

  loadLanguage(): Observable<ELanguage | null> {
    return this.http.get<ISettingDto>(`${this.BASE_URL}/settings`).pipe(
      map((setting: ISettingDto) => setting?.settings?.language || null),
      tap((language: ELanguage) => this.language$.next(language)),
    )
  }

  updateUserSettings(setting: ISettingDto): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/settings`, setting).pipe(
      tap(() => this.language$.next(setting.settings.language || this.language$.value)),
    );
  }
}
