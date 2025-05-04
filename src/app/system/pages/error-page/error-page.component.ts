import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  standalone: false,
  selector: 'fb-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent {
  readonly isLoggedIn: boolean = this.keycloackService.isLoggedIn();

  constructor(private readonly keycloackService: KeycloakService) {}
}
