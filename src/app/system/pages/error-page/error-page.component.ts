import {ChangeDetectionStrategy, Component} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {BasePageComponent} from '../../../shared/components/base-page/base-page.component';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {TranslateDirective} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'fb-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BasePageComponent,
        DefaultLayoutDirective,
        DefaultLayoutAlignDirective,
        DefaultLayoutGapDirective,
        TranslateDirective,
        NgIf,
        MatButton,
        RouterLink,
    ],
})
export class ErrorPageComponent {
    readonly isLoggedIn: boolean = this.keycloackService.isLoggedIn();

    constructor(private readonly keycloackService: KeycloakService) {
    }
}
