import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, tap, of } from 'rxjs';
import { ISettingDto } from '../../interfaces/setting-dto.interface';
import { ELanguage } from '../../enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BASE_URL: string = '/api/user';

  private readonly language$: BehaviorSubject<ELanguage> = new BehaviorSubject<ELanguage>(ELanguage.EN);

  constructor(
    private readonly http: HttpClient,
  ) {}

  getUserSettings(): Observable<ELanguage> {
    return this.language$.asObservable();
    // if (!this.language$.value) {
    //   return this.http.get<ISettingDto>(`${this.BASE_URL}/settings`).pipe(
    //     map((setting: ISettingDto) => setting?.language || ELanguage.EN),
    //     tap((language: ELanguage) => this.language$.next(language)),
    //   );
    // } else {
    //   this.language$.asObservable();
    // }
    // return of(ELanguage.EN);
  }

  updateUserSettings(setting: ISettingDto): Observable<void> {
    this.language$.next(setting.language || this.language$.value);
    return of(void 0);
    // return this.http.put<void>(`${this.BASE_URL}/settings`, setting);
  }

  setUserSettings(setting: ISettingDto): void {
    this.language$.next(setting.language || this.language$.value);
  }
}
