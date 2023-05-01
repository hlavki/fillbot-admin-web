import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingPageComponent } from './pages/billing-page/billing-page.component';
import { PersonalPageComponent } from './pages/personal-page/personal-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personal',
  },
  {
    path: 'personal',
    data: {
      breadcrumbs: {
        label: 'secured.core.breadcrumbs.preferencies',
      },
    },
    component: PersonalPageComponent,
  },
  {
    path: 'billing',
    data: {
      breadcrumbs: {
        label: 'secured.core.breadcrumbs.billing-profiles',
      },
    },
    component: BillingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
