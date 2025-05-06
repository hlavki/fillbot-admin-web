import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@shared/shared.module';

import {ProjectsRoutingModule} from './projects-routing.module';
import {WebPagesPageComponent} from './pages/web-pages-page/web-pages-page.component';
import {ApiKeysPagesComponent} from './pages/api-keys-pages/api-keys-pages.component';
import {ApiKeyDetailDialogComponent} from './dialogs/api-key-detail-dialog/api-key-detail-dialog.component';
import {ApiKeyConfigDialogComponent} from './dialogs/api-key-config-dialog/api-key-config-dialog.component';
import {WebPageDetailDialogComponent} from './dialogs/web-page-detail-dialog/web-page-detail-dialog.component';
import {ServiceCardComponent} from './components/service-card/service-card.component';
import {ConfigTabComponent} from './pages/web-page-detail-page/tabs/config-tab/config-tab.component';
import {StaticsTabComponent} from './pages/web-page-detail-page/tabs/statics-tab/statics-tab.component';
import {WebPageValidatorsDialogComponent} from './dialogs/web-page-validators-dialog/web-page-validators-dialog.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {IntegrationTabComponent,} from '@fb/modules/projects/pages/web-page-detail-page/tabs/integration-tab/integration-tab.component';

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        SharedModule,
        MatButtonToggleModule,
        WebPagesPageComponent,
        ApiKeysPagesComponent,
        ApiKeyDetailDialogComponent,
        ApiKeyConfigDialogComponent,
        WebPageDetailDialogComponent,
        ServiceCardComponent,
        ConfigTabComponent,
        StaticsTabComponent,
        IntegrationTabComponent,
        WebPageValidatorsDialogComponent,
    ],
})
export class ProjectsModule {
}
