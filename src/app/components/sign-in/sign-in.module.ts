import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { TmLayoutModule } from '@tmlib/ui-sdk/layout';
import { TmThemeModule } from '@tmlib/ui-sdk';
import{TmTabsetModule}from '@tmlib/ui-sdk/tabset';
import{TmCardModule}from '@tmlib/ui-sdk/card';
import{TmRouteTabsetModule}from '@tmlib/ui-sdk/route-tabset';
import{TmInputModule} from '@tmlib/ui-sdk/input';
import { TmFormFieldModule } from '@tmlib/ui-sdk/form-field';
import { TmButtonModule } from '@tmlib/ui-sdk/button';
import { TmToastrModule } from '@tmlib/ui-sdk/toastr';
import { TmDialogModule } from '@tmlib/ui-sdk/dialog';
import { TmCheckboxModule } from '@tmlib/ui-sdk/checkbox';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    SignInComponent,
    LogInComponent,
    SignUpComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,ReactiveFormsModule,
    TmLayoutModule,
    TmTabsetModule,
    TmRouteTabsetModule,
    TmCardModule,
    TmFormFieldModule,
    TmInputModule,
    TmButtonModule,
    TmToastrModule.forRoot(),
    TmDialogModule.forChild(),TmCheckboxModule

  ]
})
export class SignInModule { }
