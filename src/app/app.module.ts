import { NgModule } from '@angular/core';
import { BrowserModule,Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TmThemeModule } from '@tmlib/ui-sdk';
import{TmLayoutModule}from '@tmlib/ui-sdk/layout';
import { TmInputModule } from '@tmlib/ui-sdk/input';
import { TmCardModule } from '@tmlib/ui-sdk/card';
// import { TmSelectModule } from '@tmlib/ui-sdk/select';
import { TmCheckboxModule } from '@tmlib/ui-sdk/checkbox';
import { TmRadioModule } from '@tmlib/ui-sdk/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CoreModule } from './@core/core.module';
import { TmSidebarModule } from '@tmlib/ui-sdk/sidebar';
import { TmMenuModule } from '@tmlib/ui-sdk/menu';
import { TmDatepickerModule } from '@tmlib/ui-sdk/datepicker';
import { TmDialogModule } from '@tmlib/ui-sdk/dialog';
import { TmWindowModule } from '@tmlib/ui-sdk/window';
import { TmToastrModule } from '@tmlib/ui-sdk/toastr';
import{TmRouteTabsetModule}from '@tmlib/ui-sdk/route-tabset';
import { TmContextMenuModule } from '@tmlib/ui-sdk/context-menu';
import { TmUserModule } from '@tmlib/ui-sdk/user';
import { AdminModule } from './components/admin/admin.module';
import { DateAgoPipe } from './components/pipes/date-ago.pipe';
import { SortPipe } from './components/pipes/sort.pipe';
import { APP_BASE_HREF, CurrencyPipe } from '@angular/common';
import {  EncryptPipe, DecryptPipe } from './components/pipes/encrypt-decrypt/encrypt-decrypt.pipe';
import { config } from 'rxjs';
import { TmIconsModule } from '@tmlib/ui-sdk/icons';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    AdminModule.forRoot(),
    TmLayoutModule,TmSidebarModule.forRoot(),
    TmMenuModule,TmContextMenuModule,TmDialogModule.forRoot(),TmToastrModule.forRoot(),TmIconsModule

  ],
  providers: [Title,AuthGuard,EncryptPipe, DecryptPipe,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
