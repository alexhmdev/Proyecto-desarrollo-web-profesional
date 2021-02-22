import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatAccordion } from "@angular/material/expansion";
import { CookieService } from "ngx-cookie-service";
import { RecoveryPassService } from "src/app/services/recovery-pass.service";
import { RegisterService } from "src/app/services/register.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  register = true;
  forgotPass = false;
  hide = true;
  hideConfirm = true;
  passNotMatch = true;
  registerForm: FormGroup;
  recoveryEmail = new FormControl("", [Validators.required, Validators.email]);
  recoveryCode = new FormControl("", [Validators.required]);
  newPass = new FormControl("", [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
  ]);
  newPass_confirm = new FormControl("", [Validators.required]);

  sendedCode = false;
  reenterPass: boolean;
  recoveryCodeSaved: number;

  loginEmail = new FormControl("", [Validators.required, Validators.email]);
  loginPass = new FormControl("", [Validators.required]);
  loginForm: FormGroup;
  rememberPass = false;
  constructor(
    private formBuilder: FormBuilder,
    private recoveryService: RecoveryPassService,
    private registerService: RegisterService,
    private cookie: CookieService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.cookie.check('remember')) {
       if(this.cookie.get('remember') == 'true'){
        this.rememberPass = true;
      }
      console.info("cookies:", this.cookie.getAll());
      this.loginPass.setValue(this.cookie.get("email"));
      this.loginEmail.setValue(this.cookie.get("pass"));
     
    }
   this.loginForm = new FormGroup({
      email: this.loginEmail,
      passsword: this.loginPass
    });
  }
  private buildForm() {
    this.registerForm = this.formBuilder.group({
      recaptcha: ["", Validators.required],
      first_name: ["", Validators.required],
      middle_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone_number: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
          ),
          Validators.maxLength(10),
        ],
      ],
      address: this.formBuilder.group({
        city: ["", Validators.required],
        state: ["", Validators.required],
      }),
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/),
        ],
      ],
      password_confirmation: ["", Validators.required],
    });
  }

  checkPass() {
    console.log(this.passwordConfirmField.value);
    if (this.passwordConfirmField.value !== this.passwordField.value) {
      this.registerForm.get("password_confirmation").markAsDirty();
    }
  }

  // get all form values
  get recaptchaField() {
    return this.registerForm.get("recaptcha");
  }

  get firstNameField() {
    return this.registerForm.get("first_name");
  }
  get middleNameField() {
    return this.registerForm.get("middle_name");
  }
  get lastNameField() {
    return this.registerForm.get("last_name");
  }
  get phoneNumberField() {
    return this.registerForm.get("phone_number");
  }
  get cityField() {
    return this.registerForm.get("address.city");
  }
  get stateField() {
    return this.registerForm.get("address.state");
  }
  get emailField() {
    return this.registerForm.get("email");
  }
  get passwordField() {
    return this.registerForm.get("password");
  }
  get passwordConfirmField() {
    return this.registerForm.get("password_confirmation");
  }

  registerPost() {
    this.registerForm.get("recaptcha").markAsTouched();
    console.log(this.registerForm.get("password_confirmation").value);
    if (this.registerForm.valid) {
      this.registerService
        .postRegister(this.registerForm.value)
        .then((resp: any) => {
          console.log(resp);
          Swal.fire("Good job!", "Registered correctly!", "success");
        })
        .catch((err: any) => {
          console.error(err);
        });
    }
    console.log(this.registerForm.value);
  }

  resolved(captchaResponse: string) {
    this.registerForm.controls["recaptcha"].setValue(captchaResponse);
  }

  recoveryPass() {
    this.forgotPass = true;
  }

  sendRecoveryCode() {
    this.recoveryService
      .postRecovery({ email: this.recoveryEmail.value })
      .then((resp: any) => {
        console.log(resp);
        if (resp.status == "error") {
          Swal.fire("Oops", resp.error_message, "error");
        } else {
          Swal.fire(
            "Good job!",
            "A code was sended to your email, please check and write it to continue",
            "success"
          ).then(() => {
            this.sendedCode = true;
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        Swal.fire("Oops", err, "error");
      });
  }
  verifyRecoveryCode() {
    this.recoveryService
      .postValidateCode({
        email: this.recoveryEmail.value,
        recovery_code: this.recoveryCode.value,
      })
      .then((resp: any) => {
        console.log(resp);
        if (resp.status == "error") {
          Swal.fire("Oops", resp.error_message, "error");
        } else {
          Swal.fire(
            "Good job!",
            "Your code is successfuly verified",
            "success"
          ).then(() => {
            this.recoveryCodeSaved = this.recoveryCode.value;
            this.sendedCode = false;
            this.reenterPass = true;
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        Swal.fire("Oops", err, "error");
      });
  }

  changePassword() {
    this.recoveryService
      .postChangePass({
        email: this.recoveryEmail.value,
        recovery_code: this.recoveryCode.value,
        password: this.newPass.value,
        password_confirmation: this.newPass_confirm.value,
      })
      .then((resp: any) => {
        console.log(resp);
        if (resp.status == "error") {
          Swal.fire("Oops", resp.error_message, "error");
        } else {
          Swal.fire(
            "Good job!",
            "New password created successfuly",
            "success"
          ).then(() => {
            this.recoveryCodeSaved = 0;
            this.sendedCode = false;
            this.reenterPass = false;
            this.forgotPass = false;
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        Swal.fire("Oops", err, "error");
      });
  }

  login() {
    if (this.rememberPass) {
      this.cookie.set("pass", this.loginPass.value);
      this.cookie.set("email", this.loginEmail.value);
      this.cookie.set('remember','true');
    } else {
      this.cookie.deleteAll();
    }
    
  }
}
