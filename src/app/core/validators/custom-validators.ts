import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static zipCode(control: AbstractControl): ValidationErrors | null {
    if (control.value && !(new RegExp('^\\d{5}$')).test(control.value)) {
      return { zipCode : control.value };
    }
    return null;
  }

  static decimal(control: AbstractControl): ValidationErrors | null {
    if (control.value && !(new RegExp('^[\\d]*$')).test(control.value)) {
      return { decimal : control.value };
    }
    return null;
  }

  static url(control: AbstractControl): ValidationErrors | null {
    if (control.value && !(new RegExp('([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?|localhost')).test(control.value)) {
      return { url : control.value };
    }
    return null;
  }
}
