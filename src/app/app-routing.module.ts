import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AdminComponent } from './components/admin/admin.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [

  {
    path: 'auth', component: SignInComponent,
    loadChildren: () => import('./components/sign-in/sign-in.module')
      .then(m => m.SignInModule),
    data: {
      title: 'register'
    }
  },
  // {
  //   path: 'admin', component: AdminComponent,
  //   loadChildren: () => import('./components/admin/admin.module')
  //     .then(m => m.AdminModule),canActivate: [AuthGuard],
  //   data: {
  //     title: 'admin'
  //   },
  // },
  {
    path: 'user', component: UserComponent,
    loadChildren: () => import('./components/user/user.module')
      .then(m => m.UserModule), canActivate: [AuthGuard],
    data: {
      title: 'user'
    },
  },
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
