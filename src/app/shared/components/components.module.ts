import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { BasePageComponent } from './base-page/base-page.component';
import { LoadingComponent } from './loading/loading.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    BasePageComponent,
    LoadingComponent,
    ToolbarComponent,
    MenuComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    BasePageComponent,
    LoadingComponent,
    ToolbarComponent,
    MenuComponent,
    BreadcrumbsComponent,
  ],
})
export class ComponentsModule { }
