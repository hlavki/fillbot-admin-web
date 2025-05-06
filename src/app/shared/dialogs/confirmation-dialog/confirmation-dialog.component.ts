import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgFor, NgIf} from '@angular/common';
import {DefaultLayoutAlignDirective} from '@ngbracket/ngx-layout/flex';
import {MatButton} from '@angular/material/button';
import {TranslateDirective} from '@ngx-translate/core';

interface IDialogData {
    type?: 'warn',
    title: string;
    messages: string[];
}

@Component({
    selector: 'fb-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgFor,
    MatDialogActions,
    DefaultLayoutAlignDirective,
    MatButton,
    MatDialogClose,
    TranslateDirective,
    NgIf,
  ],
})
export class ConfirmationDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: IDialogData,
    ) {
    }
}
