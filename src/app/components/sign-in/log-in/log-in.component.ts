import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TmDialogRef, TmDialogService } from '@tmlib/ui-sdk/dialog';
import { TmToastrService } from '@tmlib/ui-sdk/toastr';
import { EncryptionService } from '../../services/encrypt-decrypt/encryption.service';
import { AuthService } from '../services/auth.service';
import { userData } from '../userData';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  userdata:userData;

  id:any;
  constructor(private toastrService: TmToastrService,private encryption: EncryptionService,private formBuilder: FormBuilder, private router: Router, private _http: HttpClient,private apiService:AuthService) {

   }

  ngOnInit(): void {
   console.log( this.encryption.encryptUsingTripleDES('123456', true))
    this.signInForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      }
    )

  }
  showPassword = true;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  showToast(duration) {
    this.toastrService.success(

      `Have a good day`, 'Login Succesfully' ,
     );
  }
  signIn() {
    this.submitted = true;
    this.signInForm.value.password=this.encryption.encryptUsingTripleDES(this.signInForm.value.password, true);

    if (this.signInForm.invalid) {
      return;
    }

    else {
      this.router.navigate(['auth/sign-in']);
    }
    this._http.get<userData[]>("https://template-json-server.vercel.app/api/usersData")
      .subscribe(res => {
        const user = res.find((a: userData) => {
          return a.email === this.signInForm.value.email && a.password === this.signInForm.value.password
        });

        // const admin = res.find((a: userData) => {
        //   return a.email === this.signInForm.value.email && a.password === this.signInForm.value.password && a.role='admin'
        // });
        if (user) {


          const uservalue = user;
          user.status='online';
          this.toastrService.success(

            `Have a good day`, 'Login Succesfully' ,
           );
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('currentuser', JSON.stringify(uservalue));

          this.signInForm.reset();
          console.log(user.id);
          console.log(user.status);
          setTimeout(() => {
            this.router.navigate(['/user'])
          }
          , 500)

        }
        else if (this.f.email.value == 'admin123@gmail.com' && this.f.password.value == 'admin@123') {
          const uservalue = this.signInForm.value.email;
          localStorage.setItem('isAdminLoggedIn', "true");

          localStorage.setItem('adminValue', uservalue);
          this.signInForm.reset();
          this.toastrService.success(

            `Have a good day`, 'Login Succesfully' ,
           );
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard'])
          }
          , 500)

        } else {

          this.toastrService.danger(

            `Please check your Email and Password`, 'User Not Found',
           );
          this.router.navigate(['auth/sign-in']);
        }

      }, err => {

        this.toastrService.danger(

          `Try Later`, 'Something was wrong',
         );
      })


  }

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }



}
