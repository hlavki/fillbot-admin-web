import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {IWebConfigValidatorDto} from '@fb/core/api/interfaces/web-page-config.interface';
import {TranslateDirective} from '@ngx-translate/core';
import {
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
} from '@ngbracket/ngx-layout/flex';
import {NgFor, NgIf} from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'fb-web-page-validators-dialog',
    templateUrl: './web-page-validators-dialog.component.html',
    styleUrls: ['./web-page-validators-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogTitle,
        TranslateDirective,
        MatDialogContent,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        NgFor,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        DefaultFlexDirective,
        DefaultLayoutAlignDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        NgIf,
        MatDivider,
        MatDialogActions,
        MatButton,
        MatDialogClose,
    ],
})
export class WebPageValidatorsDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly validators: IWebConfigValidatorDto[],
    ) {
    }
}
