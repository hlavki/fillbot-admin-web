import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiKeysService } from '@fb/core/api/services/api-keys/api-keys.service';
import { BillingService } from '@fb/core/api/services/billing/billing.service';
import { FormatAddressPipe } from '@fb/shared/pipes/format-address/format-address.pipe';

import { ApiKeyDetailDialogComponent } from './api-key-detail-dialog.component';

describe('ApiKeyDetailDialogComponent', () => {
  let component: ApiKeyDetailDialogComponent;
  let fixture: ComponentFixture<ApiKeyDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiKeyDetailDialogComponent, FormatAddressPipe],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
          provide: ApiKeysService,
          useValue: {
            createApiKey: () => of({}),
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

    fixture = TestBed.createComponent(ApiKeyDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
