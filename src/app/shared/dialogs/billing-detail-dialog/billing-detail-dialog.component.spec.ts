import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { BillingService } from '@fb/core/api/services/billing/billing.service';

import { BillingDetailDialogComponent } from './billing-detail-dialog.component';
import { KeycloakService } from 'keycloak-angular';

describe('BillingDetailDialogComponent', () => {
  let component: BillingDetailDialogComponent;
  let fixture: ComponentFixture<BillingDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingDetailDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: undefined,
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => void 0,
          },
        },
        {
          provide: FormBuilder,
          useValue: {
            group: () => new FormGroup({
              category: null,
              companyName: null,
              firstName: null,
              lastName: null,
              cin: null,
              vatId: null,
              street: null,
              referenceNumber: null,
              registerNumber: null,
              zipCode: null,
              city: null,
              country: null,
              currency: null,
            }),
          },
        },
        {
          provide: BillingService,
          useValue: {
            updateBillingProfile: () => of(void 0),
          },
        },
        {
          provide: KeycloakService,
          useValue: {
            logout: () => void 0,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
