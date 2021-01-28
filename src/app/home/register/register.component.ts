import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  value = 'Clear me';
  register = true;

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      // recaptcha: ['', Validators.required]
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.maxLength(10)]],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  registerPost() {
    this.registerService.postRegister(this.registerForm.value).then((resp:any) => {
      console.log(resp);
    }).catch((err:any) => {
      console.error(err);
    });
    console.log(this.registerForm.value)
  }
}
