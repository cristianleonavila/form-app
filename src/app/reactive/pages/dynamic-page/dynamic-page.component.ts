import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {
  
  public dynamicForm:FormGroup = this.frmBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    newFavoriteGame: ['', [ Validators.minLength(3)]],
    favoriteGames: this.frmBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  constructor(private frmBuilder: FormBuilder ) {

  }

  get favoriteGameControls():FormArray {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  public onSubmit():void {
    if ( this.dynamicForm.invalid ) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(this.dynamicForm.value);
    this.dynamicForm.reset();
    (this.dynamicForm.controls['favoriteGames'] as FormArray) = this.frmBuilder.array([]);
  }


  public isFieldHasErrors(field:string):boolean | null{
    return this.dynamicForm.controls[field].errors 
           && this.dynamicForm.controls[field].touched;
  }

  public isFieldInArrayHasErrors(formArray: FormArray, index: number) {
    return formArray.controls[index].errors 
           && formArray.controls[index].touched;
  }  

  public getFieldError(field:string):string | null {
    if ( !this.dynamicForm.controls[field] ) return null;
    const errors = this.dynamicForm.controls[field].errors || {};
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

  public onDeleteFavorite( index:number) {
    this.favoriteGameControls.removeAt(index);
  }

  get newFavoriteGameControl() {
    return this.dynamicForm.controls['newFavoriteGame'];
  }
  
  public addFavoriteGame():void {
    if ( this.newFavoriteGameControl.invalid ) return;
    const newGame = this.newFavoriteGameControl.value || '';
    this.favoriteGameControls.push(
      this.frmBuilder.control(newGame, [Validators.required, Validators.minLength(3) ])
    );
    this.newFavoriteGameControl.reset();
  }
  
}
