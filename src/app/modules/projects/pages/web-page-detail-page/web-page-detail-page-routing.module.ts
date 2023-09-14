import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebPageDetailPageComponent } from './web-page-detail-page.component';
import { ConfigTabComponent } from './tabs/config-tab/config-tab.component';
import { StaticsTabComponent } from './tabs/statics-tab/statics-tab.component';
import {
  IntegrationTabComponent,
} from '@fb/modules/projects/pages/web-page-detail-page/tabs/integration-tab/integration-tab.component';

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
      {
        path: 'integration',
        component: IntegrationTabComponent,
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.web-page-integration',
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
