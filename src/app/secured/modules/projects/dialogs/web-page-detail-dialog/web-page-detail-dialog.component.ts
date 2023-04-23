import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, forkJoin } from 'rxjs';

import { IBillingProfileDto } from '@fb/core/api/interfaces/billing-profile-dto.interface';
import { BillingService } from '@fb/core/api/services/billing/billing.service';
import { IPricingTierDto } from '@fb/core/api/interfaces/pricing-tier-dto.interface';
import { WebPagesService } from '@fb/core/api/services/web-pages/web-pages.service';
import { MatDialogRef } from '@angular/material/dialog';

interface IApiKeyDetailForm {
  id: string;
  enabled: boolean;
  name: string;
  originSite: string;
  billingProfile: IBillingProfileDto;
  pricingTier: IPricingTierDto;
}

@Component({
  selector: 'app-web-page-detail-dialog',
  templateUrl: './web-page-detail-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebPageDetailDialogComponent implements OnInit {
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  form: FormGroup;

  billingProfiles: IBillingProfileDto[] = [];
  pricingTiers: IPricingTierDto[] = [];

  constructor(
    private readonly webPagesService: WebPagesService,
    private readonly billingService: BillingService,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<WebPageDetailDialogComponent>,
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.billingService.getBillingProfiles(),
      this.webPagesService.getPricingTiers(),
    ]).pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe(([billingProfiles, pricingTiers]: [IBillingProfileDto[], IPricingTierDto[]]) => {
      this.billingProfiles = billingProfiles;
      this.pricingTiers = pricingTiers;

      this.form =  this.fb.group({
        id: null,
        name: [null, Validators.required],
        originSite: [null, Validators.required],
        billingProfile: [this.billingProfiles.length === 1 ? this.billingProfiles[0] : null, Validators.required],
        pricingTier: [null, Validators.required],
      });
    });
  }

  onSubmit(formValue: IApiKeyDetailForm): void {
    console.log(formValue);
    this.isLoading$.next(true);
    this.webPagesService.createWebPage({
      id: undefined,
      name: formValue.name,
      originSite: formValue.originSite,
      pricingTier: formValue.pricingTier,
      billingProfile: formValue.billingProfile,
      enabled: formValue.enabled,
    }).pipe(
      finalize(() => this.isLoading$.next(true)),
    ).subscribe(() => this.dialogRef.close({ success: true }));
  }
}
