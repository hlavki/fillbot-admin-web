import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { environment } from '@env/environment';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicComponent {
  constructor(private readonly keycloakService: KeycloakService) {}

  onLogin(): void {
    this.keycloakService.login({ redirectUri: environment.keycloak.redirectUri });
  }
}
