import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@fb/shared/shared.module';

import {WebPageDetailPageRoutingModule} from './web-page-detail-page-routing.module';
import {WebPageDetailPageComponent} from './web-page-detail-page.component';

@NgModule({
    imports: [
        CommonModule,
        WebPageDetailPageRoutingModule,
        SharedModule,
        WebPageDetailPageComponent,
    ],
})
export class WebPageDetailPageModule {
}
