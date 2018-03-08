import {ApplicationInitStatus, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/filter';
import {AuthService} from '../_auth/auth.service';

@Injectable()
export class ErrorHandlerService {
  public previousUrlToLogin: string;
  public previousUrl: string;
  private currentUrl: string;

  constructor(private authService: AuthService, private router: Router, private applicationInitStatus: ApplicationInitStatus) {
    this.enableHistory();
  }

  public http(err: any) {
    const status = _.get(err, 'status');

    switch (status) {
      case '401':
        this.unauthorizedUser();
        break;
      case '500':
        this.fatalError();
        break;
    }
  }

  public unauthorizedUser(returnUrl?: string) {
    this.authService.logout();

    this.previousUrlToLogin = returnUrl || this.router.url;

    // only redirect when app is initialized not in APP_INITIALIZER
    if (this.applicationInitStatus.done) {
      this.router.navigate(['login']);
    }
  }

  public unauthorizedRole() {
    this.router.navigate(['error/401']);
  }

  public fatalError() {
    this.router.navigate(['error']);
  }

  public hasPreviousUrlToLogin(): boolean {
    return !_.isNil(this.previousUrlToLogin);
  }

  public hasPreviousUrl(): boolean {
    return !_.isNil(this.previousUrl);
  }

  public goBack() {
    if (this.hasPreviousUrl()) {
      this.router.navigateByUrl(this.previousUrl);
    }
  }

  private enableHistory() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }
}
