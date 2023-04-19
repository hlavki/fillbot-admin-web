import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { BillingPageComponent } from './pages/billing-page/billing-page.component';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

@NgModule({
  declarations: [
    BillingPageComponent,
    PasswordPageComponent,
    PersonalPageComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule { }
