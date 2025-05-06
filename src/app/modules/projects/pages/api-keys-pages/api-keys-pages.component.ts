import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Clipboard} from '@angular/cdk/clipboard';
import {TranslateDirective, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, filter, finalize, switchMap} from 'rxjs';

import {IApiKeyDto} from '@core/api/interfaces/api-key-dto.interface';
import {ApiKeysService} from '@core/api/services/api-keys/api-keys.service';
import {IDialogClose} from '@core/interfaces/dialog-close.interface';
import {NotificationService} from '@core/services/notification/notification.service';
import {ConfirmationDialogComponent} from '@fb/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

import {ApiKeyDetailDialogComponent} from '../../dialogs/api-key-detail-dialog/api-key-detail-dialog.component';
import {ApiKeyConfigDialogComponent} from '../../dialogs/api-key-config-dialog/api-key-config-dialog.component';
import {BasePageComponent} from '@shared/components/base-page/base-page.component';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgFor} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {FormatAddressPipe} from '@shared/pipes/format-address/format-address.pipe';

@Component({
    selector: 'fb-api-keys-pages',
    templateUrl: './api-keys-pages.component.html',
    styleUrls: ['./api-keys-pages.component.scss'],
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
        MatIconButton,
        MatCardActions,
        AsyncPipe,
        FormatAddressPipe,
        TranslatePipe,
    ],
})
export class ApiKeysPagesComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly data$: BehaviorSubject<IApiKeyDto[]> = new BehaviorSubject<IApiKeyDto[]>([]);

    constructor(
        private readonly apiKeysService: ApiKeysService,
        private readonly dialog: MatDialog,
        private readonly notificationService: NotificationService,
        private readonly clipboard: Clipboard,
        private readonly translateService: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    onCopyToClipboard(apiKey: string | undefined): void {
        if (apiKey) {
            this.clipboard.copy(apiKey);
            this.notificationService.success(this.translateService.instant('core.messages.copied-to-clipboard'));
        }
    }

    onNew(): void {
        this.dialog.open(ApiKeyDetailDialogComponent).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('projects.messages.api-keys.created'));
            this.loadData();
        });
    }

    onConfig(configId: string | undefined): void {
        this.dialog.open(ApiKeyConfigDialogComponent, {data: configId}).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(
            () => this.notificationService.success(this.translateService.instant('projects.messages.api-keys.updated')),
        );
    }

    onDelete(id: string | undefined): void {
        if (id) {
            this.dialog.open(ConfirmationDialogComponent, {
                data: {
                    type: 'warn',
                    title: this.translateService.instant('core.confirmations.title'),
                    messages: [
                        this.translateService.instant('projects.confirmations.delete-api-key'),
                        this.translateService.instant('core.confirmations.not-reversible'),
                    ],
                },
            }).afterClosed().pipe(
                filter((dialogClose: IDialogClose) => !!dialogClose?.success),
                switchMap(() => this.apiKeysService.deleteApiKey(id)),
            ).subscribe(() => {
                this.notificationService.success(this.translateService.instant('projects.messages.api-keys.deleted'));
                this.loadData();
            });
        }
    }

    getApiKeySecured(apiKey: string): string {
        console.log('getApiKeySecured', apiKey);
        return `${apiKey.substring(0, 3)}${Array(apiKey.length - 6).fill('*').join('')}${apiKey.substring(apiKey.length - 3)}`
    }

    private loadData(): void {
        this.isLoading$.next(true);
        this.apiKeysService.getApiKeys().pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe((apiKeys: IApiKeyDto[]) => this.data$.next(apiKeys));
    }

}
