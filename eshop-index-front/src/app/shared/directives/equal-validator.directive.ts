import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[appEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true },
  ],
})
export class EqualValidatorDirective implements Validator {

  @Input() appEqual: string;

  validate(control: AbstractControl): {[key: string]: any} {
    return control.value === this.appEqual ? null : { equal: this.appEqual };
  }

}
