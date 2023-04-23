import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { WebPagesPageComponent } from './pages/web-pages-page/web-pages-page.component';
import { ApiKeysPagesComponent } from './pages/api-keys-pages/api-keys-pages.component';
import { ApiKeyDetailDialogComponent } from './dialogs/api-key-detail-dialog/api-key-detail-dialog.component';
import { ApiKeyConfigDialogComponent } from './dialogs/api-key-config-dialog/api-key-config-dialog.component';
import { WebPageDetailDialogComponent } from './dialogs/web-page-detail-dialog/web-page-detail-dialog.component';
import { WebPageConfigDialogComponent } from './dialogs/web-page-config-dialog/web-page-config-dialog.component';

@NgModule({
  declarations: [
    WebPagesPageComponent,
    ApiKeysPagesComponent,
    ApiKeyDetailDialogComponent,
    ApiKeyConfigDialogComponent,
    WebPageDetailDialogComponent,
    WebPageConfigDialogComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
  ],
})
export class ProjectsModule { }
