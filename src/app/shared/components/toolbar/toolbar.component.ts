import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent{

  constructor(
    private readonly keycloakService: KeycloakService,
  ) {}

  onLogout(): void {
    this.keycloakService.logout(`${window.location.origin}/home`);
  }
}
