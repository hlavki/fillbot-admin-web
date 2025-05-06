import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BehaviorSubject, finalize} from 'rxjs';

import {IApiKeyConfigDto} from '@core/api/interfaces/api-key-dto.interface';
import {ApiKeysService} from '@core/api/services/api-keys/api-keys.service';
import {CustomValidators} from '@fb/core/validators/custom-validators';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingComponent} from '@shared/components/loading/loading.component';
import {TranslateDirective} from '@ngx-translate/core';
import {DefaultLayoutAlignDirective, DefaultLayoutDirective, DefaultLayoutGapDirective} from '@ngbracket/ngx-layout/flex';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'fb-api-key-config-dialog',
    templateUrl: './api-key-config-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        LoadingComponent,
        MatDialogTitle,
        TranslateDirective,
        MatDialogContent,
        ReactiveFormsModule,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective,
        MatFormField,
        MatLabel,
        MatInput,
        MatHint,
        MatDialogActions,
        DefaultLayoutAlignDirective,
        MatButton,
        MatDialogClose,
        AsyncPipe,
    ],
})
export class ApiKeyConfigDialogComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    form: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private readonly apiKeyId: string,
        private readonly apiKeysService: ApiKeysService,
        private readonly fb: FormBuilder,
        private readonly dialogRef: MatDialogRef<ApiKeyConfigDialogComponent>,
    ) {
    }

    ngOnInit(): void {
        this.apiKeysService.getApiKeyConfig(this.apiKeyId).pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe((apiKeyConfig: IApiKeyConfigDto) => {
            this.form = this.fb.group({
                dailyAmountLimit: [apiKeyConfig.dailyAmountLimit, CustomValidators.decimal],
            });
        });
    }

    onSubmit(formValue: IApiKeyConfigDto): void {
        this.isLoading$.next(true);
        this.apiKeysService.updateApiKeyConfig(this.apiKeyId, {
            dailyAmountLimit: formValue.dailyAmountLimit ? formValue.dailyAmountLimit : null,
        }).pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe(() => this.dialogRef.close({success: true}));
    }
}
