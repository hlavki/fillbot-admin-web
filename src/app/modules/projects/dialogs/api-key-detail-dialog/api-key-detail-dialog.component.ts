import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BehaviorSubject, finalize} from 'rxjs';

import {IBillingProfileDto} from '@core/api/interfaces/billing-profile-dto.interface';
import {ApiKeysService} from '@core/api/services/api-keys/api-keys.service';
import {BillingService} from '@core/api/services/billing/billing.service';
import {CustomValidators} from '@fb/core/validators/custom-validators';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {TranslateDirective} from '@ngx-translate/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from '@ngbracket/ngx-layout/flex';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormMessageComponent} from '../../../../shared/components/form-message/form-message';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {FormatAddressPipe} from '../../../../shared/pipes/format-address/format-address.pipe';

interface IApiKeyDetailForm {
    name: string;
    dailyAmountLimit: number;
    billingProfile: IBillingProfileDto;
}

@Component({
    selector: 'fb-api-key-detail-dialog',
    templateUrl: './api-key-detail-dialog.component.html',
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
    MatError,
    FormMessageComponent,
    DefaultFlexDirective,
    MatSelect,
    NgFor,
    MatOption,
    MatDivider,
    MatHint,
    MatDialogActions,
    DefaultLayoutAlignDirective,
    MatButton,
    MatDialogClose,
    AsyncPipe,
    FormatAddressPipe,
  ],
})
export class ApiKeyDetailDialogComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    form: FormGroup;

    billingProfiles: IBillingProfileDto[] = [];

    constructor(
        private readonly apiKeysService: ApiKeysService,
        private readonly billingService: BillingService,
        private readonly fb: FormBuilder,
        private readonly dialogRef: MatDialogRef<ApiKeyDetailDialogComponent>,
    ) {
    }

    ngOnInit(): void {
        this.billingService.getBillingProfiles().pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe((billingProfiles: IBillingProfileDto[]) => {
            this.billingProfiles = billingProfiles;

            this.form = this.fb.group({
                name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                dailyAmountLimit: [null, CustomValidators.decimal],
                billingProfile: [this.billingProfiles.length === 1 ? this.billingProfiles[0] : null, Validators.required],
            });
        });
    }

    onSubmit(formValue: IApiKeyDetailForm): void {
        this.isLoading$.next(true);
        this.apiKeysService.createApiKey({
            billingProfile: formValue.billingProfile,
            name: formValue.name,
            ...(formValue.dailyAmountLimit ? {config: {dailyAmountLimit: formValue.dailyAmountLimit}} : {}),
        }).pipe(
            finalize(() => this.isLoading$.next(true)),
        ).subscribe(() => this.dialogRef.close({success: true}));
    }

}
