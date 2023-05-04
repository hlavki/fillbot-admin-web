import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@fb/shared/shared.module';

import { WebPageDetailPageRoutingModule } from './web-page-detail-page-routing.module';
import { WebPageDetailPageComponent } from './web-page-detail-page.component';

@NgModule({
  declarations: [
    WebPageDetailPageComponent,
  ],
  imports: [
    CommonModule,
    WebPageDetailPageRoutingModule,
    SharedModule,
  ],
})
export class WebPageDetailPageModule { }
