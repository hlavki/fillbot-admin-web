import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebPageDetailPageComponent } from './web-page-detail-page.component';
import { ConfigTabComponent } from './tabs/config-tab/config-tab.component';
import { StaticsTabComponent } from './tabs/statics-tab/statics-tab.component';

const routes: Routes = [
  {
    path: '',
    component: WebPageDetailPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'config',
      },
      {
        path: 'config',
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.web-page-config',
          },
        },
        component: ConfigTabComponent,
      },
      {
        path: 'statistics',
        component: StaticsTabComponent,
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.web-page-stats',
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebPageDetailPageRoutingModule { }
