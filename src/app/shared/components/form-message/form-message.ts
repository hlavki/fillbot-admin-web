import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[fb-form-message]',
  template: '<span>{{ errorMessage() | translate }}</span>',
})
export class FormMessageComponent {

  @Input() control: AbstractControl;

  constructor(
    private readonly translateService: TranslateService,
  ) {}

  errorMessage(): string {
    for (const propertyName in this.control.errors) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

  private getValidatorErrorMessage(validatorName: string, validatorValue?: ValidationErrors): string {
    const validatorMessages: Record<string, string> = {
      required: this.translateService.instant('messages.required'),
      decimal: this.translateService.instant('messages.decimal'),
      zipCode: this.translateService.instant('messages.zipCode'),
      minlength: this.translateService.instant('messages.minLength', { value: validatorValue['requiredLength'] }),
      maxlength: this.translateService.instant('messages.maxLength', { value: validatorValue['requiredLength'] }),
      url: this.translateService.instant('messages.url'),
    };

    return validatorMessages[validatorName];
  }

}
