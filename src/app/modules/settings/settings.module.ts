import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { BillingPageComponent } from './pages/billing-page/billing-page.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';
import { PaymentMethodDialogComponent } from './dialogs/payment-method-dialog/payment-method-dialog.component';

@NgModule({
  declarations: [
    BillingPageComponent,
    PersonalPageComponent,
    PaymentMethodDialogComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule { }
