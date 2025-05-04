import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'fb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  readonly isMenuVisible$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(`Current URL: ${val.urlAfterRedirects}`);
      }
    });
  }

  onLogout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}
