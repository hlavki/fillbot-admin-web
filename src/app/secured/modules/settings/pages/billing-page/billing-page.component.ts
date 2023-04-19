import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, finalize, filter, switchMap } from 'rxjs';

import { IBillingProfileDto } from '@core/api/interfaces/billing-profile-dto.interface';
import { IDialogClose } from '@core/interfaces/dialog-close.interface';
import { BillingService } from '@core/api/services/billing/billing.service';
import { NotificationService } from '@core/services/notification/notification.service';

import { BillingDetailDialogComponent } from '@shared/dialogs/billing-detail-dialog/billing-detail-dialog.component';
import { ConfirmationDialogComponent } from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingPageComponent implements OnInit {
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly data$: BehaviorSubject<IBillingProfileDto[]> = new BehaviorSubject<IBillingProfileDto[]>([]);

  constructor(
    private readonly billingService: BillingService,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onNew(): void {
    this.dialog.open(BillingDetailDialogComponent).afterClosed().pipe(
      filter((dialogClose: IDialogClose) => !!dialogClose?.success),
    ).subscribe(() => {
      this.notificationService.success(this.translateService.instant('secured.settings.messages.created'));
      this.loadData();
    });
  }

  onEdit(billingProfile: IBillingProfileDto): void {
    this.dialog.open(BillingDetailDialogComponent, {
      data: billingProfile,
    }).afterClosed().pipe(
      filter((dialogClose: IDialogClose) => !!dialogClose?.success),
    ).subscribe(() => {
      this.notificationService.success(this.translateService.instant('secured.settings.messages.updated'));
      this.loadData();
    });
  }

  onDelete(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: 'warn',
        title: this.translateService.instant('secured.core.confirmations.title'),
        messages: [
          this.translateService.instant('secured.settings.confirmations.delete'),
          this.translateService.instant('secured.core.confirmations.not-reversible'),
        ],
      },
    }).afterClosed().pipe(
      filter((dialogClose: IDialogClose) => !!dialogClose?.success),
      switchMap(() => this.billingService.deleteBillingProfile(id)),
    ).subscribe(() => {
      this.notificationService.success(this.translateService.instant('secured.settings.messages.deleted'));
      this.loadData();
    });
  }

  private loadData(): void {
    this.isLoading$.next(true);
    this.billingService.getBillingProfiles().pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe((billingProfiles: IBillingProfileDto[]) => this.data$.next(billingProfiles));
  }

}
