import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { BillingDetailDialogComponent } from '@shared/dialogs/billing-detail-dialog/billing-detail-dialog.component';
import { BillingService } from '@core/api/services/billing/billing.service';

@Injectable({ providedIn: 'root' })
export class BillingGuard implements CanActivate {

  constructor(
    private readonly dialog: MatDialog,
    private readonly billingService: BillingService,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.billingService.checkBillingProfile().pipe(
      switchMap((hasBillingProfile: boolean) => !hasBillingProfile ?
        this.dialog.open(BillingDetailDialogComponent, {
          closeOnNavigation: false,
          disableClose: true,
        }).afterClosed().pipe(
          map((result: boolean) => result || this.router.parseUrl('/home')),
        ) : of(true)),
    );
  }
}
