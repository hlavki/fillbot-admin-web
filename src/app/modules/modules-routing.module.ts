import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'projects',
      },
      {
        path: 'projects',
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.projects',
          },
        },
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'settings',
        data: {
          breadcrumbs: {
            label: 'core.breadcrumbs.settings',
          },
        },
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      { path: '**', redirectTo: '/system/not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule { }
