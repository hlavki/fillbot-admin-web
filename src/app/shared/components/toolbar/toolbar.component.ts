import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {BehaviorSubject} from 'rxjs';
import {DefaultFlexDirective, DefaultLayoutAlignDirective} from '@ngbracket/ngx-layout/flex';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DefaultShowHideDirective} from '@ngbracket/ngx-layout/extended';
import {AsyncPipe, NgIf} from '@angular/common';
import {MenuComponent} from '../menu/menu.component';

@Component({
    selector: 'fb-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DefaultFlexDirective,
        DefaultLayoutAlignDirective,
        MatIconButton,
        MatIcon,
        DefaultShowHideDirective,
        NgIf,
        MenuComponent,
        AsyncPipe,
    ],
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
