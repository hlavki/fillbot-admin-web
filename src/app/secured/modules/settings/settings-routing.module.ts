import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingPageComponent } from './pages/billing-page/billing-page.component';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'billing',
  },
  {
    path: 'personal',
    component: PersonalPageComponent,
  },
  {
    path: 'billing',
    component: BillingPageComponent,
  },
  {
    path: 'password',
    component: PasswordPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
