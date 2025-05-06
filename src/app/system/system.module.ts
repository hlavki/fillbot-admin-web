import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@shared/shared.module';

import {SystemRoutingModule} from './system-routing.module';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {ForbiddenPageComponent} from './pages/forbidden-page/forbidden-page.component';

@NgModule({
    imports: [
        CommonModule,
        SystemRoutingModule,
        SharedModule,
        ErrorPageComponent,
        NotFoundPageComponent,
        ForbiddenPageComponent,
    ],
})
export class SystemModule {
}
