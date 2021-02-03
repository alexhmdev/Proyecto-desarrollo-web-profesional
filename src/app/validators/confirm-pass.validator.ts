import { AbstractControl } from '@angular/forms';


export function confirmPass(pass1: AbstractControl, pass2: AbstractControl) {
  if (pass1.value != pass2.value) {
    return { passConfirmed: true };
  }
  return null;
}