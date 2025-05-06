import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ToolbarComponent} from '../shared/components/toolbar/toolbar.component';
import {MenuComponent} from '../shared/components/menu/menu.component';
import {DefaultShowHideDirective} from '@ngbracket/ngx-layout/extended';
import {DefaultLayoutDirective} from '@ngbracket/ngx-layout/flex';
import {BreadcrumbsComponent} from '../shared/components/breadcrumbs/breadcrumbs.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'fb-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ToolbarComponent,
        MenuComponent,
        DefaultShowHideDirective,
        DefaultLayoutDirective,
        BreadcrumbsComponent,
        RouterOutlet,
    ],
})
export class ModulesComponent {
}
