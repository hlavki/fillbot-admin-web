import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'fb-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenPageComponent {
  readonly isLoggedIn: boolean = this.keycloackService.isLoggedIn();

  constructor(private readonly keycloackService: KeycloakService) {}
}
