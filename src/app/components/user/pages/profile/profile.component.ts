import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/sign-in/services/auth.service';
import { userData } from 'src/app/components/sign-in/userData';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userdata!: userData;
  profileForm!: FormGroup;
  submitted!: boolean;
  id: any;
  showPassword!: boolean;
  constructor(private formBuilder: FormBuilder, private router: Router, private _http: HttpClient, private apiService: AuthService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('currentuser') || '{}');
    this.id = this.userdata.id

    console.log(this.id)

    this.profileForm = this.formBuilder.group(
      {
        id: [this.userdata.id],
        userName: [this.userdata.userName],
        email: [this.userdata.email],
        phoneNumber: [this.userdata.phoneNumber],
        gender: [this.userdata.gender],
        address: [this.userdata.address],
        password: [
          this.userdata.password,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
      }
    )
  }
  // profile update
  updateProfile() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    localStorage.setItem('currentuser', JSON.stringify(this.profileForm.value));


    this.apiService.update(this.id, this.profileForm.value).subscribe((res: any) => {

      console.log('user updated successfully!');

    })

  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

}
