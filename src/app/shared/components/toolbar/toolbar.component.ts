import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  readonly isMenuVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly keycloakService: KeycloakService,
  ) {}

  onLogout(): void {
    this.keycloakService.logout(`${window.location.origin}/home`);
  }
}
