import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  protected form:FormGroup = new FormGroup([]);

  constructor() { }

  public currentForm(form:FormGroup) {
    this.form = form;
  }

  public isFieldHasErrors(field:string):boolean | null{
    return this.form.controls[field].errors 
           && this.form.controls[field].touched;
  }

  public isFieldInArrayHasErrors(formArray: FormArray, index: number) {
    return formArray.controls[index].errors 
           && formArray.controls[index].touched;
  }  

  public getFieldError(field:string):string | null {
    if ( !this.form.controls[field] ) return null;
    const errors = this.form.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch ( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener mínimo ${ errors['minlength'].requiredLength } caracteres`;
        case 'min':
          return `Debe ser mayor o igual a ${ errors['min'].min }`;
      }
    }
    return null;
  }  

  public cantBeStrider(control:FormControl): ValidationErrors | null {
    const userName = control.value.trim().toLowerCase();
    if ( userName === 'strider' ) {
      return {
        userAlreadyExists: true
      };
    }
    return null;
  }

  public isFieldsMatch(field1:string, field2:string) {
    return ( frmGroup: FormGroup ):ValidationErrors | null => {
      const value1 = frmGroup.get(field1)?.value;
      const value2 = frmGroup.get(field2)?.value;
      const valError = { fieldsDoesntMatch: true };

      if ( value1 !== value2 ) {
        frmGroup.get(field2)?.setErrors(valError);
        return valError;
      }

      frmGroup.get(field2)?.setErrors(null);
      return null;

    };
  }

}
