import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, delay, of} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
    selector: 'fb-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, AsyncPipe],
})
export class LoadingComponent implements OnInit {
    @Input() hasDelay: boolean;

    readonly show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    ngOnInit(): void {
        if (this.hasDelay) {
            of(null).pipe(delay(200)).subscribe(() => this.show$.next(true));
        } else {
            this.show$.next(true);
        }
    }
}
