import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, finalize } from 'rxjs';

import { IBillingProfileDto } from '@core/api/interfaces/billing-profile-dto.interface';
import { ApiKeysService } from '@core/api/services/api-keys/api-keys.service';
import { BillingService } from '@core/api/services/billing/billing.service';

interface IApiKeyDetailForm {
  name: string;
  dailyAmountLimit: number;
  billingProfile: IBillingProfileDto;
}

@Component({
  selector: 'app-api-key-detail-dialog',
  templateUrl: './api-key-detail-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ) {}

  ngOnInit(): void {
    this.billingService.getBillingProfiles().pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe((billingProfiles: IBillingProfileDto[]) => {
      this.billingProfiles = billingProfiles;

      this.form = this.fb.group({
        name: [null, Validators.required],
        dailyAmountLimit: null,
        billingProfile: [this.billingProfiles.length === 1 ? this.billingProfiles[0] : null, Validators.required],
      });
    });
  }

  onSubmit(formValue: IApiKeyDetailForm): void {
    this.isLoading$.next(true);
    this.apiKeysService.createApiKey({
      billingProfile: formValue.billingProfile,
      name: formValue.name,
      ...(formValue.dailyAmountLimit ? { config: { dailyAmountLimit: formValue.dailyAmountLimit }} : {}),
    }).pipe(
      finalize(() => this.isLoading$.next(true)),
    ).subscribe(() => this.dialogRef.close({ success: true }));
  }

}
