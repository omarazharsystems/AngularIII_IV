import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


import { NavigationEnd, Router, Event } from '@angular/router';
import { TmDialogService } from '@tmlib/ui-sdk/dialog';

import { filter } from 'rxjs/operators';
import { LogInComponent } from './log-in/log-in.component';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  @Input() name: string;
  tabs: any[] = [
    {
      title: 'Sign Up',
      route: './sign-up',
    },
    {
      title: 'Sign In',
      route: './log-in',
    },
  ]
  message!: string;
  hide: boolean = true;
  constructor(public router: Router, private dialogService: TmDialogService) {
    // path match
    router.events
      .pipe(filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((res: NavigationEnd) => {
        if (res.url == '/auth/sign-up') {
          this.message = "Sign Up"
          this.hide = true;
        }
        else if (res.url == '/auth/sign-in') {
          this.message = "Sign In"
          this.hide = false;
        }
        else {
          this.message = "Password Recovery";
          this.hide = true;
        }
      });
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('auth/sign-in')
  }
}
