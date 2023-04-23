import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, finalize, filter, switchMap } from 'rxjs';

import { IWebPageDto } from '@fb/core/api/interfaces/web-page-dto.interface';
import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { IDialogClose } from '@fb/core/interfaces/dialog-close.interface';

import { WebPageDetailDialogComponent } from '../../dialogs/web-page-detail-dialog/web-page-detail-dialog.component';
import { NotificationService } from '@fb/core/services/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from '@fb/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-web-pages-page',
  templateUrl: './web-pages-page.component.html',
  styleUrls: ['./web-pages-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPagesPageComponent implements OnInit {
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly data$: BehaviorSubject<IWebPageDto[]> = new BehaviorSubject<IWebPageDto[]>([]);

  constructor(
    private readonly webPagesService: WebPagesService,
    private readonly dialog: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onNew(): void {
    this.dialog.open(WebPageDetailDialogComponent).afterClosed().pipe(
      filter((dialogClose: IDialogClose) => !!dialogClose?.success),
    ).subscribe(() => {
      this.notificationService.success(this.translateService.instant('secured.projects.messages.web-pages.created'));
      this.loadData();
    });
  }

  onDelete(id: string | undefined): void {
    if (id) {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          type: 'warn',
          title: this.translateService.instant('secured.core.confirmations.title'),
          messages: [
            this.translateService.instant('secured.projects.confirmations.delete-web-page'),
            this.translateService.instant('secured.core.confirmations.not-reversible'),
          ],
        },
      }).afterClosed().pipe(
        filter((dialogClose: IDialogClose) => !!dialogClose?.success),
        switchMap(() => this.webPagesService.deleteWebPage(id)),
      ).subscribe(() => {
        this.notificationService.success(this.translateService.instant('secured.projects.messages.web-pages.deleted'));
        this.loadData();
      });
    }
  }

  navigate(originSite: string): void {
    window.open(`${originSite}?config=true`);
  }

  private loadData(): void {
    this.isLoading$.next(true);
    this.webPagesService.getWebPages().pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe((data: IWebPageDto[]) => this.data$.next(data));
  }
}
