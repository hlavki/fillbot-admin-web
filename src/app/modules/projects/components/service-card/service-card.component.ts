import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, BehaviorSubject } from 'rxjs';

import { IWebConfigValidatorDto, IWebPageConfigDto } from '@fb/core/api/interfaces/web-page-config.interface';
import { EServiceConfigType } from '@fb/core/enums/service-config-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { WebPageValidatorsDialogComponent } from '../../dialogs/web-page-validators-dialog/web-page-validators-dialog.component';
import {getConfiguratorUrl} from '@core/utils/webPageUtil';

@Component({
  selector: 'fb-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent implements OnInit {
  readonly eServiceConfigType = EServiceConfigType;

  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  @Input() active = false;
  @Input() origin: string;
  @Input() config: IWebPageConfigDto;
  @Input() type: EServiceConfigType;

  @Output() configChanged: EventEmitter<Partial<IWebPageConfigDto>> = new EventEmitter();

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.active) {
      this.form = this.createForm(this.type);

      this.form.get('enabled').valueChanges.pipe(
        tap((value: boolean) => this.changeEnabled(this.type, 'enabled', value)),
      ).subscribe();

      this.form.get('showValidationState').valueChanges.pipe(
        tap((value: boolean) => this.changeEnabled(this.type, 'showValidationState', value)),
      ).subscribe();

      if (this.type === EServiceConfigType.ADDRESS) {
        this.form.get('useGeolocation').valueChanges.pipe(
          tap((value: boolean) => this.changeEnabled(this.type, 'useGeolocation', value)),
        ).subscribe();
      }
    } else {
      this.form = this.fb.group({});
    }
    this.isLoading$.next(false);
  }

  navigate(originSite: string): void {
    window.open(getConfiguratorUrl(originSite), '_blank');
  }

  onSwowValidators(validators: IWebConfigValidatorDto[]): void {
    this.dialog.open(WebPageValidatorsDialogComponent, {
      data: validators,
    });
  }

  private changeEnabled(type: EServiceConfigType, key: string, value: boolean): void {
    switch(type) {
      case EServiceConfigType.ADDRESS:
        this.configChanged.emit({
          address: {
            ...this.config.address,
            [key]: value,
          },
        });
        break;
      case EServiceConfigType.EMAIL:
        this.configChanged.emit({
          email: {
            ...this.config.email,
            [key]: value,
          },
        });
        break;
      case EServiceConfigType.COMPANY:
        this.configChanged.emit({
          company: {
            ...this.config.company,
            [key]: value,
          },
        });
        break;
      case EServiceConfigType.PHONE_NUMBER:
        this.configChanged.emit({
          phoneNumber: {
            ...this.config.phoneNumber,
            [key]: value,
          },
        });
        break;
    }
  }

  private createForm(type: EServiceConfigType): FormGroup {
    switch(type) {
      case EServiceConfigType.ADDRESS:
        return this.fb.group({
          enabled: this.config.address?.enabled,
          showValidationState: this.config.address?.showValidationState,
          useGeolocation: this.config.address?.useGeolocation,
        });
      case EServiceConfigType.EMAIL:
        return this.fb.group({
          enabled: this.config.email?.enabled,
          showValidationState: this.config.email?.showValidationState,
        });
      case EServiceConfigType.COMPANY:
        return this.fb.group({
          enabled: this.config.company?.enabled,
          showValidationState: this.config.company?.showValidationState,
        });
      case EServiceConfigType.PHONE_NUMBER:
        return this.fb.group({
          enabled: this.config.phoneNumber?.enabled,
          showValidationState: this.config.phoneNumber?.showValidationState,
        });
    }
  }
}
