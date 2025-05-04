import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject, finalize, switchMap, map, filter, startWith } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { IWebPageDto } from '@fb/core/api/interfaces/web-page-dto.interface';
import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { WebPageDetailDataService } from '@fb/core/services/web-page-detail-data/web-page-detail-data.service';

@Component({
  standalone: false,
  selector: 'fb-web-page-detail-page',
  templateUrl: './web-page-detail-page.component.html',
  styleUrls: ['./web-page-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPageDetailPageComponent implements OnInit, OnDestroy {
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly dataWebPage$: BehaviorSubject<IWebPageDto> = new BehaviorSubject<IWebPageDto>(null);

  readonly selectedIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private readonly webPageService: WebPagesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly webPageDetailDataService: WebPageDetailDataService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map((params: Params) => params['id']),
      switchMap((id: string) => this.webPageService.getWebPage(id).pipe(
        finalize(() => this.isLoading$.next(false)),
      )),
    ).subscribe((webPage: IWebPageDto) => {
      this.dataWebPage$.next(webPage);
      this.webPageDetailDataService.setOrigin(webPage.originSite);
    });

    this.router.events.pipe(
      filter((event: unknown) => event instanceof NavigationEnd),
      startWith(null),
    ).subscribe(() => {
      switch (this.router.url.split('/').pop()) {
        case 'config':
          this.selectedIndex$.next(0);
          break;
        case 'statistics':
          this.selectedIndex$.next(1);
          break;
        case 'integration':
          this.selectedIndex$.next(2);
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.webPageDetailDataService.setOrigin(null);
  }

  onSelectedTabChange(tab: MatTabChangeEvent): void {
    switch (tab.index) {
      case 0:
        this.router.navigate(['/', 'projects', 'web-pages', this.activatedRoute.snapshot.params['id'], 'config']);
        break;
      case 1:
        this.router.navigate(['/', 'projects', 'web-pages', this.activatedRoute.snapshot.params['id'], 'statistics']);
        break;
      case 2:
        this.router.navigate(['/', 'projects', 'web-pages', this.activatedRoute.snapshot.params['id'], 'integration']);
        break;
    }
  }
}
