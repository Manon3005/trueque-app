import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
  standalone: false
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') passwordToMatch!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null;

    const password = control.parent.get(this.passwordToMatch);
    const confirmPassword = control;

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }
}
