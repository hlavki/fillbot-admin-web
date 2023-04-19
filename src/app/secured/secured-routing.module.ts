import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillingGuard } from '../core/guards/billing.guard';

import { SecuredComponent } from './secured.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredComponent,
    canActivate: [BillingGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule),
      },
      { path: '**', redirectTo: '/system/not-found' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuredRoutingModule { }
