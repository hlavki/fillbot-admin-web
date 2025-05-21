import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BehaviorSubject, finalize, forkJoin} from 'rxjs';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';

import {IBillingProfileDto} from '@fb/core/api/interfaces/billing-profile-dto.interface';
import {BillingService} from '@fb/core/api/services/billing/billing.service';
import {IPricingTierDto} from '@fb/core/api/interfaces/pricing-tier-dto.interface';
import {WebPagesService} from '@fb/core/api/services/web-pages/web-pages.service';
import {CustomValidators} from '@fb/core/validators/custom-validators';
import {TranslateDirective, TranslatePipe, TranslateService} from '@ngx-translate/core';
import {AsyncPipe, CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from '@ngbracket/ngx-layout/flex';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {FormMessageComponent} from '../../../../shared/components/form-message/form-message';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {FormatAddressPipe} from '../../../../shared/pipes/format-address/format-address.pipe';

interface IApiKeyDetailForm {
    id: string;
    enabled: boolean;
    name: string;
    originSite: string;
    billingProfile: IBillingProfileDto;
    pricingTier: IPricingTierDto;
}

@Component({
    selector: 'fb-web-page-detail-dialog',
    templateUrl: './web-page-detail-dialog.component.html',
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
    MatHint,
    MatDialogActions,
    DefaultLayoutAlignDirective,
    MatButton,
    MatDialogClose,
    AsyncPipe,
    CurrencyPipe,
    FormatAddressPipe,
    TranslatePipe,
  ],
})
export class WebPageDetailDialogComponent implements OnInit {
    readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    currentLang: string = this.translateService.currentLang ?? this.translateService.defaultLang;

    form: FormGroup;

    billingProfiles: IBillingProfileDto[] = [];
    pricingTiers: IPricingTierDto[] = [];

    constructor(
        private readonly webPagesService: WebPagesService,
        private readonly billingService: BillingService,
        private readonly translateService: TranslateService,
        private readonly fb: FormBuilder,
        private readonly dialogRef: MatDialogRef<WebPageDetailDialogComponent>,
    ) {
    }

    ngOnInit(): void {
        forkJoin([
            this.billingService.getBillingProfiles(),
            this.webPagesService.getPricingTiers(this.currentLang),
        ]).pipe(
            finalize(() => this.isLoading$.next(false)),
        ).subscribe(([billingProfiles, pricingTiers]: [IBillingProfileDto[], IPricingTierDto[]]) => {
            this.billingProfiles = billingProfiles;
            this.pricingTiers = pricingTiers;

            this.form = this.fb.group({
                id: null,
                name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                originSite: [null, [Validators.required, CustomValidators.url, Validators.maxLength(100)]],
                billingProfile: [this.billingProfiles.length === 1 ? this.billingProfiles[0] : null, Validators.required],
                pricingTier: [this.presetPricingTier(), Validators.required],
            });
        });
    }

    onSubmit(formValue: IApiKeyDetailForm): void {
        this.isLoading$.next(true);
        this.webPagesService.create({
            id: undefined,
            name: formValue.name,
            originSite: formValue.originSite,
            pricingTier: {code: formValue.pricingTier.code},
            billingProfile: formValue.billingProfile,
            enabled: formValue.enabled,
        }).pipe(
            finalize(() => this.isLoading$.next(true)),
        ).subscribe(() => this.dialogRef.close({success: true}));
    }

    presetPricingTier(): IPricingTierDto {
        return this.pricingTiers.find((pricingTier: IPricingTierDto) => pricingTier.preset === true);
    }
}
