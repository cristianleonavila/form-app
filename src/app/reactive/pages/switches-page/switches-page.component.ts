import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/share/services/validators.service';


@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrls: ['./switches-page.component.css']
})
export class SwitchesPageComponent implements OnInit {

  public switchesForm:FormGroup = this.frmBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(
    private frmBuilder:FormBuilder,
    private validator: ValidatorsService) {}

  ngOnInit(): void {
    this.validator.currentForm(this.switchesForm);
  }

  get frmValidator() : ValidatorsService {
    return this.validator;
  }

  public onSave() {
    if (this.switchesForm.invalid) {
      this.switchesForm.markAllAsTouched();
      return;
    }
    console.log(this.switchesForm.value);
    
  }

}
