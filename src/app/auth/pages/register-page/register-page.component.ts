import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService, emailPattern, firstNameAndLastnamePattern } from 'src/app/share/services/validators.service';
import { EmailValidatorService } from 'src/app/share/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  
  public registerFrm:FormGroup = this.frmBuilder.group({
    name: ['', [Validators.required, Validators.pattern(firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)], [this.emailValidator]],
    userName: ['', [Validators.required, this.validators.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required]],
  });

  constructor(
    private frmBuilder: FormBuilder,
    private validators: ValidatorsService,
    private emailValidator: EmailValidatorService) {

  }

  get customValidator(): ValidatorsService {
    return this.validators;
  }

  ngOnInit(): void {
    this.validators.currentForm(this.registerFrm);
  }

}
