import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ConfirmedValidator } from '../confirm.validator';
import { AuthService } from '../services/auth.service';
import { userData, usersdata } from '../userData';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  signInForm!: FormGroup;
  userData!: userData;
  updateData: any;
  passwordForm!: FormGroup;
  otpForm!: FormGroup;
  email!: string;
  phoneNumber!: string;
  userName!: string;
  agree!: boolean;
  submitted = false;
  recover = false;
  show: boolean = false;
  showEmail = false;
  otpMessage: string = "Send OTP";
  otpSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: AuthService, private route: ActivatedRoute, private _http: HttpClient) { }
  id!: number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  ngOnInit(): void {


    this.signInForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],

      }
    )
    this.otpForm = this.formBuilder.group(
      {
        otp: ['', [Validators.required]],

      }
    )
    this.passwordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ], confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]

      }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    }
    )
  }
  showPassword = true;
  passwordMatch = false;
  conformPassword = true;
  getInputType() {
    if (this.showPassword) {
      return 'password';
    }
    return 'text';

  }
  getInputconformPassType() {
    if (this.conformPassword) {
      return 'password';
    }
    return 'text';

  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConformPassword() {
    this.conformPassword = !this.conformPassword
  }
  // otp generated
  signIn() {
    this.submitted = true;

    if (this.signInForm.invalid) {
      return;
    }
    this.email = this.signInForm.value.email;
    console.log(this.email);


    if (this.submitted) {
      this.otpMessage = "Resend OTP";
    }
    if (this.otpMessage = "Resend OTP") {
      this.show = true;
    }

    this._http.get<any>("https://template-json-server.vercel.app/api/usersData")
      .subscribe(res => {
        const user = res.find((a: any) => {
          if (a.email === this.signInForm.value.email)
            return this.id = a.id, this.email = a.email;

        });
      });
  }
  otpMessageSuccess!: boolean;
  resendOTP() {
    this.otpMessageSuccess = true;
  }
  // otp conformation
  forgotPassword() {

    this.otpSubmitted = true;
    if (this.otpForm.invalid) {
      return;
    }
    if (this.otpSubmitted) {

      this.showEmail = !this.showEmail;
      this.show = false;
    }

  }
  //new password submision
  recoverPassword() {
    this.recover = true;
    if (this.passwordForm.invalid) {
      return;
    }

    this.apiService.update(this.id, this.passwordForm.value).subscribe((res: any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('/auth/sign-in');
    })
    this.router.navigate(['/auth/sign-in'])
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
  get passwordRecover(): { [key: string]: AbstractControl } {
    return this.passwordForm.controls;
  }
  get otpform(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }



}
