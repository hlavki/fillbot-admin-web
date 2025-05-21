import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';

import {ModulesRoutingModule} from './modules-routing.module';
import {ModulesComponent} from './modules.component';

@NgModule({
    imports: [
        CommonModule,
        ModulesRoutingModule,
        SharedModule,
        ModulesComponent,
    ],
})
export class ModulesModule {
}
