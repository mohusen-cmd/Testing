import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationErrors } from '@iplab/ngx-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidatorsService {

  constructor() { }
  static phoneValidation(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null
    }
    const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(control.value)
    return PHONE_REGEXP ? null : { invalidPhoneNumber: true }
  }
  static faxValidator(number): any {
    

    if (number.pristine) {
      return null;
    }
    const FAX_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    number.markAsTouched();
    if (FAX_REGEXP.test(number.value)) {
      return null;
    }
    return {
      invalidFaxNumber: true
    };
  }
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value == "" || control.value === undefined) return null;

    if ((control.value as string).indexOf(" ") >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  static ssnValidator(ssn): any {
    if (ssn.pristine) {
      return null;
    }
    const SSN_REGEXP =
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
    ssn.markAsTouched();
    if (SSN_REGEXP.test(ssn.value)) {
      return null;
    }
    return {
      invalidSsn: true,
    };
  }

  

  // Validates numbers
  static numberValidator(number): any {
    if (number.pristine) {
      return null;
    }
    const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
    number.markAsTouched();
    if (NUMBER_REGEXP.test(number.value)) {
      return null;
    }
    return {
      invalidNumber: true,
    };
  }

  // Validates passwords
  static matchPassword(group: FormGroup): any {
    const password = group.controls.address1;
    const confirm = group.controls.address2;
    if (password.pristine || confirm.pristine) {
      return null;
    }
    group.markAsTouched();
    if (password.value === confirm.value) {
      return null;
    }
    return {
      invalidPassword: true,
    };
  }

  // Validates URL
  static urlValidator(url): any {
    if (url.pristine) {
      return null;
    }
    const URL_REGEXP =
      /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    url.markAsTouched();
    if (URL_REGEXP.test(url.value)) {
      return null;
    }
    return {
      invalidUrl: true,
    };
  }

  // Validates zip codes
  static zipCodeValidator(zip): any {
    if (zip.pristine) {
      return null;
    }
    const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
    zip.markAsTouched();
    if (zip.value === '' || ZIP_REGEXP.test(zip.value)) {
      return null;
    }
    return {
      invalidZip: true,
    };
  }
}
