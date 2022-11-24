import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidacaoCampoSenha {
  static MustMatch(controlName: string, matchingControlName: string): any {
      return (group: AbstractControl) => {
          const formGroup = group as FormGroup;
          const matchingControl = formGroup.controls[matchingControlName];
          const control = formGroup.controls[controlName];

          if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
              return null;
          }

          if (control.value !== matchingControl.value){
              matchingControl.setErrors({mustMatch: true});
          } else {
              matchingControl.setErrors(null);
            }

          return null;
      };
  }
}
