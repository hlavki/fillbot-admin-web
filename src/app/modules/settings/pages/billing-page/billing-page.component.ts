import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, filter, finalize, switchMap} from 'rxjs';

import {IBillingProfileDto} from '@core/api/interfaces/billing-profile-dto.interface';
import {IDialogClose} from '@core/interfaces/dialog-close.interface';
import {BillingService} from '@core/api/services/billing/billing.service';
import {NotificationService} from '@core/services/notification/notification.service';

import {BillingDetailDialogComponent} from '@shared/dialogs/billing-detail-dialog/billing-detail-dialog.component';
import {ConfirmationDialogComponent} from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {TranslateDirective, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {PaymentMethodDialogComponent,} from '@fb/modules/settings/dialogs/payment-method-dialog/payment-method-dialog.component';
import {BasePageComponent} from '../../../../shared/components/base-page/base-page.component';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from '@ngbracket/ngx-layout/flex';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {MatChip} from '@angular/material/chips';
import {MatIconButton} from '@angular/material/button';

@Component({
    selector: 'fb-billing-page',
    templateUrl: './billing-page.component.html',
    styleUrls: ['./billing-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BasePageComponent,
        DefaultLayoutDirective,
        MatCard,
        MatCardContent,
        DefaultLayoutAlignDirective,
        DefaultLayoutGapDirective,
        MatIcon,
        TranslateDirective,
        NgFor,
        MatCardHeader,
        MatCardTitle,
        DefaultFlexDirective,
        NgIf,
        MatChip,
        MatCardActions,
        MatIconButton,
        AsyncPipe,
        TranslatePipe,
    ],
})
export class BillingPageComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly data$: BehaviorSubject<IBillingProfileDto[]> = new BehaviorSubject<IBillingProfileDto[]>([]);

    constructor(
        private readonly billingService: BillingService,
        private readonly dialog: MatDialog,
        private readonly notificationService: NotificationService,
        private readonly translateService: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    onNew(): void {
        this.dialog.open(BillingDetailDialogComponent).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('settings.messages.created'));
            this.loadData();
        });
    }

    onEdit(billingProfile: IBillingProfileDto): void {
        this.dialog.open(BillingDetailDialogComponent, {
            data: billingProfile,
        }).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('settings.messages.updated'));
            this.loadData();
        });
    }

    onEditPaymentMethod(billingProfile: IBillingProfileDto): void {
        this.dialog.open(PaymentMethodDialogComponent, {
            data: billingProfile,
        }).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('settings.messages.updated'));
            this.loadData();
        });
    }

    onDelete(id: number): void {
        this.dialog.open(ConfirmationDialogComponent, {
            data: {
                type: 'warn',
                title: this.translateService.instant('core.confirmations.title'),
                messages: [
                    this.translateService.instant('settings.confirmations.delete'),
                    this.translateService.instant('core.confirmations.not-reversible'),
                ],
            },
        }).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
            switchMap(() => this.billingService.deleteBillingProfile(id)),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('settings.messages.deleted'));
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
