import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { UserService } from '@fb/core/api/services/user/user.service';

import { SettingsGuard } from './settings.quard';

describe('SettingsGuard', () => {
  let settingsGuard: SettingsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            setDefaultLang: () => void 0 as unknown,
          },
        },
        {
          provide: UserService,
          useValue: {
            loadLanguage: () => of(null),
          },
        },
      ],
    });
  });

  beforeEach(() => {
    settingsGuard = TestBed.inject(SettingsGuard);
  });

  it('should create', () => {
    expect(settingsGuard).toBeTruthy();
  });
});
