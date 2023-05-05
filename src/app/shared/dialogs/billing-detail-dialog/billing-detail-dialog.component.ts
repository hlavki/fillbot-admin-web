import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { pick } from 'lodash-es';
import { startWith, BehaviorSubject, finalize, Observable, of } from 'rxjs';

import { ECountry } from '@core/api/enums/country.enum';
import { ECurrency } from '@core/api/enums/currency.enum';
import { IBillingProfileDto, ICreateBillingProfileDto } from '@core/api/interfaces/billing-profile-dto.interface';
import { BillingService } from '@core/api/services/billing/billing.service';
import { EBillingType } from '@core/enums/billing-type.enum';
import { IBillingDetailForm } from '@core/interfaces/billing-detail-form.interface';
import { CustomValidators } from '@fb/core/validators/custom-validators';

@Component({
  selector: 'fb-billing-detail-dialog',
  templateUrl: './billing-detail-dialog.component.html',
  styleUrls: ['./billing-detail-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingDetailDialogComponent implements OnInit {
  readonly eBillingType = EBillingType;
  readonly eCountry = ECountry;
  readonly eCurrency = ECurrency;

  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  readonly form: FormGroup = this.fb.group({
    category: this.data?.companyName ? EBillingType.COMPANY : EBillingType.PERSONAL,
    companyName: [this.data?.companyName || null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    firstName: [this.data?.firstName || null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: [this.data?.lastName || null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cin: [this.data?.cin || null, Validators.required],
    vatId: [this.data?.vatId || null, Validators.required],
    street: [this.data?.address.street || null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    referenceNumber: [this.data?.address.referenceNumber || null, Validators.required],
    registerNumber: [this.data?.address.registerNumber || null, Validators.required],
    zipCode: [this.data?.address.zipCode || null, [Validators.required, CustomValidators.zipCode]],
    city: [this.data?.address.city || null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    country: [this.data?.country || null, Validators.required],
    currency: [this.data?.currency || null, Validators.required],
  });

  readonly category$: Observable<EBillingType> = this.form.get('category')?.valueChanges.pipe(
    startWith(this.form.get('category')?.value),
  ) || of(EBillingType.PERSONAL);

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: IBillingProfileDto | undefined,
    public readonly dialogRef: MatDialogRef<BillingDetailDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly billingService: BillingService,
    private readonly keycloakService: KeycloakService,
  ) {}

  ngOnInit(): void {
    this.form.get('category')?.valueChanges.pipe(
      startWith(this.form.get('category')?.value),
    ).subscribe((value: EBillingType) => {
      if (value === EBillingType.COMPANY) {
        this.form.get('companyName')?.enable();
        this.form.get('cin')?.enable();
        this.form.get('vatId')?.enable();
        this.form.get('firstName')?.disable();
        this.form.get('lastName')?.disable();
      } else {
        this.form.get('companyName')?.disable();
        this.form.get('cin')?.disable();
        this.form.get('vatId')?.disable();
        this.form.get('firstName')?.enable();
        this.form.get('lastName')?.enable();
      }
    })
  }

  onSubmit(formValue: IBillingDetailForm): void {
    const dataToSave: ICreateBillingProfileDto = {
      address: {
        city: formValue.city,
        referenceNumber: formValue.referenceNumber,
        registerNumber: formValue.registerNumber,
        street: formValue.street,
        zipCode: formValue.zipCode,
      },
      country: formValue.country,
      currency: formValue.currency,
      ...(pick(formValue, formValue.category === EBillingType.PERSONAL ? ['firstName', 'lastName'] : ['companyName', 'vatId', 'cin'])),
    }

    this.isLoading$.next(true);
    (this.data ? this.billingService.updateBillingProfile(this.data.id, dataToSave) : this.billingService.createBillingProfile(dataToSave)).pipe(
      finalize(() => this.isLoading$.next(true)),
    ).subscribe(() => this.dialogRef.close({ success: true }));
  }

  onCancel(): void {
    this.keycloakService.logout(window.location.origin);
  }
}
