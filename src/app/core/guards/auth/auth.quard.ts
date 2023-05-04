import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloakService: KeycloakService,
  ) {
    super(router, keycloakService);
  }

  public async isAccessAllowed(): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      const options: Keycloak.KeycloakLoginOptions = {
        redirectUri: window.location.href,
      };
      options.redirectUri = window.location.href;

      await this.keycloakService.login(options);
    }
    return true;
  }
}
