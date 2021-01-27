import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  value = 'Clear me';
  register = true;

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // recaptcha: ['', Validators.required]
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required, Validators.maxLength(10)],
      address: {
        city: ['', Validators.required],
        state: ['', Validators.required],
      },
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }
}
