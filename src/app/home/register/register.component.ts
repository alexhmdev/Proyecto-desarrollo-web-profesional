import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  register = true;
  forgotPass = false;
  hide = true;
  hideConfirm = true;
  passNotMatch = true;
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.registerForm = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im), Validators.maxLength(10)]],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
      password_confirmation: ['', Validators.required]
    });
  }

  checkPass() {
    console.log(this.passwordConfirmField.value)
    if (this.passwordConfirmField.value !== this.passwordField.value) {
      this.registerForm.get('password_confirmation').markAsDirty()
    }
  }

  // get all form values
  get recaptchaField() {
    return this.registerForm.get('recaptcha');
  }

  get firstNameField() {
    return this.registerForm.get('first_name');
  }
  get middleNameField() {
    return this.registerForm.get('middle_name');
  }
  get lastNameField() {
    return this.registerForm.get('last_name');
  }
  get phoneNumberField() {
    return this.registerForm.get('phone_number');
  }
  get cityField() {
    return this.registerForm.get('address.city');
  }
  get stateField() {
    return this.registerForm.get('address.state');
  }
  get emailField() {
    return this.registerForm.get('email');
  }
  get passwordField() {
    return this.registerForm.get('password');
  }
  get passwordConfirmField() {
    return this.registerForm.get('password_confirmation');
  }


  registerPost() {
    this.registerForm.get('recaptcha').markAsTouched();
    console.log(this.registerForm.get('password_confirmation').value)
    if (this.registerForm.valid) {
      this.registerService.postRegister(this.registerForm.value).then((resp: any) => {
        console.log(resp);
        Swal.fire(
          'Good job!',
          'Registered correctly!',
          'success'
        )
      }).catch((err: any) => {
        console.error(err);
      });
    }
    console.log(this.registerForm.value)
  }

  resolved(captchaResponse: string) {
    this.registerForm.controls['recaptcha'].setValue(captchaResponse);
  }

  recoveryPass() {

  }
}
