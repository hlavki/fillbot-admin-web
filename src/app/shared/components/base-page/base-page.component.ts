import {ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {LoadingComponent} from '../loading/loading.component';
import {NgIf, NgTemplateOutlet} from '@angular/common';

@Component({
    selector: 'fb-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        LoadingComponent,
        NgIf,
        NgTemplateOutlet,
    ],
})
export class BasePageComponent {
    @Input() isLoading: boolean | null = false;
    @Input() heading: string;

    @ContentChild('content', {static: true}) contentRef: TemplateRef<HTMLElement>;
}
