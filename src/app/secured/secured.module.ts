import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '@fb/core/api/services/user/user.service';

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
export class SecuredModule {
  constructor(
    private readonly userService: UserService,
  ) {
    this.userService.loadLanguage().subscribe();
  }
}
