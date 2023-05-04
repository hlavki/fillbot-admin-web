import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingGuard } from '@core/guards/billing/billing.guard';
import { AuthGuard } from '@core/guards/auth/auth.quard';
import { SettingsGuard } from '@core/guards/settings/settings.quard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, SettingsGuard, BillingGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
      },
      {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
      },
      { path: '**', redirectTo: '/system/not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
