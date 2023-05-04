import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { UserService } from '@fb/core/api/services/user/user.service';

import { PersonalPageComponent } from './personal-page.component';

describe('PersonalPageComponent', () => {
  let component: PersonalPageComponent;
  let fixture: ComponentFixture<PersonalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalPageComponent],
      imports: [TranslateModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: UserService,
          useValue: {
            getLanguage: () => of(null),
            updateUserSettings: () => of(void 0),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
