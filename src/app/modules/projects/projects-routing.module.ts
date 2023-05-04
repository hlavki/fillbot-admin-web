import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeysPagesComponent } from './pages/api-keys-pages/api-keys-pages.component';
import { WebPagesPageComponent } from './pages/web-pages-page/web-pages-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'web-pages',
  },
  {
    path: 'web-pages',
    pathMatch: 'full',
    data: {
      breadcrumbs: {
        label: 'core.breadcrumbs.web-pages',
      },
    },
    component: WebPagesPageComponent,
  },
  {
    path: 'web-pages',
    data: {
      breadcrumbs: {
        label: 'core.breadcrumbs.web-pages',
      },
    },
    children: [
      {
        path: ':id',
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.web-page-detail',
            disabled: true,
          },
        },
        loadChildren: () => import('./pages/web-page-detail-page/web-page-detail-page.module').then(m => m.WebPageDetailPageModule),
      },
    ],
  },
  {
    path: 'api-keys',
    data: {
      breadcrumbs: {
        label: 'core.breadcrumbs.api-keys',
      },
    },
    component: ApiKeysPagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
