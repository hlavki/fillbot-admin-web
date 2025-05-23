import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material/material.module';
import {PipesModule} from './pipes/pipes.module';
import {ComponentsModule} from './components/components.module';

import {BillingDetailDialogComponent} from './dialogs/billing-detail-dialog/billing-detail-dialog.component';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        PipesModule,
        TranslateModule,
        BillingDetailDialogComponent,
        ConfirmationDialogComponent,
    ],
    exports: [
        ComponentsModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        PipesModule,
        TranslateModule,
    ],
})
export class SharedModule {
}
