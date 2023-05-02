import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { NotificationService } from '@fb/core/services/notification/notification.service';
import { FormatAddressPipe } from '@fb/shared/pipes/format-address/format-address.pipe';

import { WebPagesPageComponent } from './web-pages-page.component';

describe('WebPagesPageComponent', () => {
  let component: WebPagesPageComponent;
  let fixture: ComponentFixture<WebPagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebPagesPageComponent, FormatAddressPipe],
      imports: [RouterTestingModule, TranslateModule.forRoot({}), MatSelectModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: WebPagesService,
          useValue: {
            deleteWebPage: () => of(void 0),
            getWebPages: () => of([]),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of({ success: true }),
            }),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            success: () => void 0,
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => void 0,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
