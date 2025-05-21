import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ELanguage} from '@fb/core/api/enums/language.enum';
import {UserService} from '@fb/core/api/services/user/user.service';
import {Observable} from 'rxjs';
import {BasePageComponent} from '../../../../shared/components/base-page/base-page.component';
import {TranslateDirective, TranslatePipe} from '@ngx-translate/core';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {AsyncPipe, NgClass, NgIf} from '@angular/common';
import {MatError} from '@angular/material/input';
import {DefaultClassDirective} from '@ngbracket/ngx-layout/extended';

@Component({
    selector: 'fb-personal-page',
    templateUrl: './personal-page.component.html',
    styleUrls: ['./personal-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        BasePageComponent,
        TranslateDirective,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        NgIf,
        MatError,
        DefaultLayoutAlignDirective,
        NgClass,
        DefaultClassDirective,
        AsyncPipe,
        TranslatePipe,
    ],
})
export class PersonalPageComponent {
    readonly eLanguage = ELanguage;

    readonly language$: Observable<ELanguage> = this.userService.getLanguage();

    constructor(
        private readonly userService: UserService,
    ) {
    }

    onSelected(language: ELanguage): void {
        this.userService.updateUserSettings({settings: {language}}).subscribe();
    }
}
