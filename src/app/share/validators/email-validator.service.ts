import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor() { 

  }

  /*validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return of({
      emailTaken: true
    }).pipe(
      delay(2000)
    );
  }*/

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return new Observable<ValidationErrors | null>( (subscriber) => {
      console.log( { email });

      if ( email === 'cristian.leon.avila@gmail.com') {
        subscriber.next( { emailTaken: true } );
        subscriber.complete();
        return;
      }
      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay( 2000 )
    );
  }  
}
