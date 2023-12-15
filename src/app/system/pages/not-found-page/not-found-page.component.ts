import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'fb-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  readonly isLoggedIn: boolean = this.keycloackService.isLoggedIn();

  constructor(private readonly keycloackService: KeycloakService) {}
}
