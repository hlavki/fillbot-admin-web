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
    component: WebPagesPageComponent,
  },
  {
    path: 'api-keys',
    component: ApiKeysPagesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
