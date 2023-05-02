import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { BillingService } from '../api/services/billing/billing.service';

import { BillingGuard } from './billing.guard';

describe('BillingGuard', () => {
  let authGuard: BillingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of({ success: true }),
            }),
          },
        },
        {
          provide: BillingService,
          useValue: {
            checkBillingProfile: () => of(false),
          },
        },
        {
          provide: Router,
          useValue: {
            parseUrl: () => '',
          },
        },
      ],
    });
  });

  beforeEach(() => {
    authGuard = TestBed.inject(BillingGuard);
  });

  it('should create', () => {
    expect(authGuard).toBeTruthy();
  });
});
