import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import {AuthService} from './auth.service';
import {ErrorHandlerService} from '../error/error-handler.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  public previousRouteToLogin: ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('canActivate start');
    this.previousRouteToLogin = null;

    // if (!this.authService.currentUser.isLogged()) {
    //   await this.authService.initCurrentUserFromStorage();
    // }

    if (!this.authService.currentUser.isLogged()) {
      this.previousRouteToLogin = route;
      this.errorHandlerService.handlerUserNotLogged();
      return false;
    }

    const allowRoles = route.data.allowRoles;
    if (!this.authService.currentUser.hasAnyRoles(allowRoles)) {
      this.errorHandlerService.handlerUserUnathorized();
      return false;
    }

    return true;
  }
}
