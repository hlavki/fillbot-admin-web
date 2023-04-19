import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SecuredComponent,
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    SharedModule,
  ],
})
export class SecuredModule { }
