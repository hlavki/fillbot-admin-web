import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {WebPagesService} from '@fb/core/api/services/web-pages/web-pages.service';
import {environment} from '@env/environment';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../../../shared/components/loading/loading.component';
import {DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
    selector: 'fb-integration-tab',
    templateUrl: './integration-tab.component.html',
    styleUrls: ['./integration-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        LoadingComponent,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        AsyncPipe,
        TranslatePipe,
    ],
})
export class IntegrationTabComponent implements OnInit {

    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    readonly includeSnippetCode$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly webPageService: WebPagesService,
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.parent.params.pipe(
            map((params: Params) => this.generateSnippet(params['id'])),
        ).subscribe((snippet: string) => {
            this.includeSnippetCode$.next(snippet);
            this.isLoading$.next(false);
        });
    }

    generateSnippet(resourceId: string): string {
        return `<!-- FillBot snippet start -->
<script src="${environment.clientLibUrl}" async defer
        onload="fillbotApi('${resourceId}')">
</script>
<!-- FillBot snippet end -->`;
    }
}
