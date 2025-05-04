import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router, Event as RouterEvent, NavigationEnd, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';

import { IBreadcrumbLink } from '@fb/core/interfaces/breadcrumb.interface';
import { uniqBy } from 'lodash-es';

@Component({
  standalone: false,
  selector: 'fb-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  @Input() minLinks = 1;

  readonly breadcrumbsLinks$: Observable<IBreadcrumbLink[]> = this.router.events.pipe(
    filter((event: RouterEvent) => event instanceof NavigationEnd),
    startWith(null),
    map(() => {
      let routeSnapshot: ActivatedRouteSnapshot = this.activatedRoute.root.snapshot;
      let route: string[] = ['/'];
      const links: IBreadcrumbLink[] = [];

      do {
        if (routeSnapshot.url.length) {
          route = [
            ...route,
            ...routeSnapshot.url.map((urlSegment: UrlSegment) => urlSegment.path),
          ];
        }

        if (routeSnapshot.url.length && routeSnapshot.data['breadcrumbs']) {
          if (routeSnapshot.data['breadcrumbs'].parents) {
            (routeSnapshot.data['breadcrumbs'].parents || []).forEach((link: IBreadcrumbLink) => links.push(link));
          }

          if (routeSnapshot.data['breadcrumbs'].label) {
            links.push({
              label: routeSnapshot.data['breadcrumbs'].label,
              disabled: routeSnapshot.data['breadcrumbs'].disabled,
              route,
            });
          }
        }
        routeSnapshot = routeSnapshot.firstChild as unknown as ActivatedRouteSnapshot;
      } while (routeSnapshot);

      return uniqBy(links, (link: IBreadcrumbLink) => link.label);
    }),
  );

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}
}
