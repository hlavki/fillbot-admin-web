import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { WebPageDetailDataService } from '@fb/core/services/web-page-detail-data/web-page-detail-data.service';

import { ConfigTabComponent } from './config-tab.component';
import { IWebPageConfigDto } from '@fb/core/api/interfaces/web-page-config.interface';

describe('ConfigTabComponent', () => {
  let component: ConfigTabComponent;
  let fixture: ComponentFixture<ConfigTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigTabComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              params: new BehaviorSubject<Params>({}),
            }
          },
        },
        {
          provide: WebPagesService,
          useValue: {
            getWebPageConfig: () => of({
              address: { validators: [] },
              phoneNumber: { validators: [] },
              email: { validators: [] },
              company: { validators: [] },
            } as IWebPageConfigDto),
            updateWebPageConfig: () => void 0,
          },
        },
        {
          provide: WebPageDetailDataService,
          useValue: {
            getOrigin: () => of(''),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
