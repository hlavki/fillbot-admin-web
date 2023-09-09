import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, Observable, finalize, map, switchMap} from 'rxjs';

import {IWebPageConfigDto} from '@fb/core/api/interfaces/web-page-config.interface';
import {WebPagesService} from '@fb/core/api/services/web-pages/web-pages.service';
import {EServiceConfigType} from '@fb/core/enums/service-config-type.enum';
import {WebPageDetailDataService} from '@fb/core/services/web-page-detail-data/web-page-detail-data.service';
import {getConfiguratorUrl} from '@core/utils/webPageUtil';

@Component({
  selector: 'fb-config-tab',
  templateUrl: './config-tab.component.html',
  styleUrls: ['./config-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabComponent implements OnInit {
  readonly eServiceConfigType = EServiceConfigType;

  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly dataWebPageConfig$: BehaviorSubject<IWebPageConfigDto> = new BehaviorSubject<IWebPageConfigDto>(null);
  readonly origin$: Observable<string> = this.webPageDetailDataService.getOrigin();

  readonly activeServices$: Observable<EServiceConfigType[]> = this.dataWebPageConfig$.asObservable().pipe(
    map((webPageConfig: IWebPageConfigDto) => [
      ...(webPageConfig.address.validators.length ? [EServiceConfigType.ADDRESS] : []) as EServiceConfigType[],
      ...(webPageConfig.email.validators.length ? [EServiceConfigType.EMAIL] : []) as EServiceConfigType[],
      ...(webPageConfig.phoneNumber.validators.length ? [EServiceConfigType.PHONE_NUMBER] : []) as EServiceConfigType[],
      ...(webPageConfig.company.validators.length ? [EServiceConfigType.COMPANY] : []) as EServiceConfigType[],
    ]),
  );

  readonly possibleServices$: Observable<EServiceConfigType[]> = this.dataWebPageConfig$.asObservable().pipe(
    map((webPageConfig: IWebPageConfigDto) => [
      ...(webPageConfig.address.validators.length ? [] : [EServiceConfigType.ADDRESS]) as EServiceConfigType[],
      ...(webPageConfig.email.validators.length ? [] : [EServiceConfigType.EMAIL]) as EServiceConfigType[],
      ...(webPageConfig.phoneNumber.validators.length ? [] : [EServiceConfigType.PHONE_NUMBER]) as EServiceConfigType[],
      ...(webPageConfig.company.validators.length ? [] : [EServiceConfigType.COMPANY]) as EServiceConfigType[],
    ]),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly webPageService: WebPagesService,
    private readonly webPageDetailDataService: WebPageDetailDataService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.pipe(
      map((params: Params) => params['id']),
      switchMap((id: string) => this.webPageService.getWebPageConfig(id).pipe(
        finalize(() => this.isLoading$.next(false)),
      )),
    ).subscribe((webPageConfig: IWebPageConfigDto) => {
      this.dataWebPageConfig$.next(webPageConfig);
    });
  }

  startConfigurationWidget(): void {
    this.origin$.subscribe((origin: string) => {
      console.log(`Opening configurator for ${getConfiguratorUrl(origin)}`);
      window.open(getConfiguratorUrl(origin), '_blank');
    });
  }

  onConfigChanged(config: Partial<IWebPageConfigDto>): void {
    const configToSave: IWebPageConfigDto = {
      ...this.dataWebPageConfig$.value,
      ...config,
    };
    this.webPageService.updateWebPageConfig(this.activatedRoute.snapshot.parent.params['id'], configToSave).subscribe(
      () => this.dataWebPageConfig$.next(configToSave),
    );
  }
}
