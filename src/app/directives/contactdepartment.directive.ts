import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appContactdepartment]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ContactdepartmentDirective,
    multi: true
  }]
})
export class ContactdepartmentDirective implements Validator{
  @Input() appContactdepartment: any
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = contactDepartmentValidator(this.appContactdepartment);
    return validatorFn(control);
  }
}

export function contactDepartmentValidator(defaultValue: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == defaultValue) {
      return { 'defaultselectedvalue': true };
    }
    return null;
  };
}

