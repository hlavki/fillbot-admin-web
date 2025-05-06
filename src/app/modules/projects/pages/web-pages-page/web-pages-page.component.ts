import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, filter, finalize, switchMap} from 'rxjs';

import {IWebPageDto} from '@fb/core/api/interfaces/web-page-dto.interface';
import {WebPagesService} from '@fb/core/api/services/web-pages/web-pages.service';
import {IDialogClose} from '@fb/core/interfaces/dialog-close.interface';

import {WebPageDetailDialogComponent} from '../../dialogs/web-page-detail-dialog/web-page-detail-dialog.component';
import {NotificationService} from '@fb/core/services/notification/notification.service';
import {TranslateDirective, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ConfirmationDialogComponent} from '@fb/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Router, RouterLink} from '@angular/router';
import {getConfiguratorUrl} from '@core/utils/webPageUtil';
import {BasePageComponent} from '../../../../shared/components/base-page/base-page.component';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgClass, NgFor} from '@angular/common';
import {DefaultClassDirective} from '@ngbracket/ngx-layout/extended';
import {MatIconButton} from '@angular/material/button';

@Component({
    selector: 'fb-web-pages-page',
    templateUrl: './web-pages-page.component.html',
    styleUrls: ['./web-pages-page.component.scss'],
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
        NgClass,
        DefaultClassDirective,
        RouterLink,
        MatCardHeader,
        MatCardTitle,
        MatCardActions,
        MatIconButton,
        AsyncPipe,
        TranslatePipe,
    ],
})
export class WebPagesPageComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly data$: BehaviorSubject<IWebPageDto[]> = new BehaviorSubject<IWebPageDto[]>([]);

    constructor(
        private readonly webPagesService: WebPagesService,
        private readonly dialog: MatDialog,
        private readonly notificationService: NotificationService,
        private readonly translateService: TranslateService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    onNew(): void {
        this.dialog.open(WebPageDetailDialogComponent).afterClosed().pipe(
            filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        ).subscribe(() => {
            this.notificationService.success(this.translateService.instant('projects.messages.web-pages.created'));
            this.loadData();
        });
    }

    onDetail(event: Event, id: string, tab?: string): void {
        event.stopPropagation();
        this.router.navigate(['/', 'projects', 'web-pages', id, ...(tab ? [tab] : [])])
    }

    onDelete(event: Event, id: string | undefined): void {
        event.stopPropagation();
        if (id) {
            this.dialog.open(ConfirmationDialogComponent, {
                data: {
                    type: 'warn',
                    title: this.translateService.instant('core.confirmations.title'),
                    messages: [
                        this.translateService.instant('projects.confirmations.delete-web-page'),
                        this.translateService.instant('core.confirmations.not-reversible'),
                    ],
                },
            }).afterClosed().pipe(
                filter((dialogClose: IDialogClose) => !!dialogClose?.success),
                switchMap(() => this.webPagesService.delete(id)),
            ).subscribe(() => {
                this.notificationService.success(this.translateService.instant('projects.messages.web-pages.deleted'));
                this.loadData();
            });
        }
    }

    navigate(event: Event, originSite: string): void {
        event.stopPropagation();
        window.open(getConfiguratorUrl(originSite), '_blank');
    }

    private loadData(): void {
        this.isLoading$.next(true);
        this.webPagesService.getWebPages().pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe((data: IWebPageDto[]) => this.data$.next(data));
    }
}
