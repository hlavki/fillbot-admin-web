import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Params, Router, RouterEvent } from '@angular/router';

import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { WebPageDetailDataService } from '@fb/core/services/web-page-detail-data/web-page-detail-data.service';
import { FormatAddressPipe } from '@fb/shared/pipes/format-address/format-address.pipe';

import { WebPageDetailPageComponent } from './web-page-detail-page.component';

describe('WebPageDetailPageComponent', () => {
  let component: WebPageDetailPageComponent;
  let fixture: ComponentFixture<WebPageDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebPageDetailPageComponent, FormatAddressPipe],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: WebPagesService,
          useValue: {
            getWebPage: () => of({}),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<Params>({}),
          },
        },
        {
          provide: Router,
          useValue: {
            events: new BehaviorSubject<RouterEvent>(null),
          },
        },
        {
          provide: WebPageDetailDataService,
          useValue: {
            setOrigin: () => void 0,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
