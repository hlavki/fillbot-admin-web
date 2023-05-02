import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { FormatAddressPipe } from '@fb/shared/pipes/format-address/format-address.pipe';

import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { BillingService } from '@fb/core/api/services/billing/billing.service';

import { WebPageDetailDialogComponent } from './web-page-detail-dialog.component';

describe('WebPageDetailDialogComponent', () => {
  let component: WebPageDetailDialogComponent;
  let fixture: ComponentFixture<WebPageDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebPageDetailDialogComponent, FormatAddressPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, MatSelectModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => void 0,
          },
        },
        {
          provide: FormBuilder,
        },
        {
          provide: WebPagesService,
          useValue: {
            getPricingTiers: () => of([]),
            createWebPage: () => of(void 0),
          },
        },
        {
          provide: BillingService,
          useValue: {
            getBillingProfiles: () => of([]),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPageDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
