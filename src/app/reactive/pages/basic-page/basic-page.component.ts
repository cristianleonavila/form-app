import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent implements OnInit {
  
  /*public basicForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  });*/

  public basicForm:FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(3)] ],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]]
  });

  ngOnInit(): void {
    this.resetForm();
  }

  private resetForm() {
    this.basicForm.reset({
      price: 0,
      inStorage: 0
    });
  }

  public isFieldHasErrors(field:string):boolean | null{
    return this.basicForm.controls[field].errors 
           && this.basicForm.controls[field].touched;
  }

  public getFieldError(field:string):string | null {
    if ( !this.basicForm.controls[field] ) return null;
    const errors = this.basicForm.controls[field].errors || {};
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

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit():void {
    if ( this.basicForm.invalid ) return;
      console.log(this.basicForm.value);
      this.resetForm();
  }
}
