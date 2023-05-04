import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'fb-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  readonly isLoggedIn$: Observable<boolean> = from(this.keycloackService.isLoggedIn());

  constructor(private readonly keycloackService: KeycloakService) {}
}
