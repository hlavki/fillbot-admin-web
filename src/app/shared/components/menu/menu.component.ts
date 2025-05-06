import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {AsyncPipe, NgClass} from '@angular/common';
import {DefaultClassDirective} from '@ngbracket/ngx-layout/extended';
import {MatIcon} from '@angular/material/icon';
import {TranslateDirective} from '@ngx-translate/core';

@Component({
    selector: 'fb-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DefaultLayoutDirective,
        DefaultLayoutAlignDirective,
        NgClass,
        DefaultClassDirective,
        DefaultLayoutGapDirective,
        MatIcon,
        TranslateDirective,
        RouterLinkActive,
        RouterLink,
        AsyncPipe,
    ],
})
export class MenuComponent implements OnInit {
    @Output() selected: EventEmitter<void> = new EventEmitter<void>();

    readonly expanded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly expandedIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        if (this.router.url.includes('/settings')) {
            this.expandedIndex$.next(3);
        } else if (this.router.url.includes('/projects')) {
            this.expandedIndex$.next(1);
        }
    }
}
