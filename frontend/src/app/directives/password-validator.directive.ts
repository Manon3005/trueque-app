import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true
    }
  ],
  standalone: false
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    const valid =
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /\d/.test(value) &&
      /[a-z]/.test(value);

    return valid ? null : { passwordInvalid: true };
  }
}
