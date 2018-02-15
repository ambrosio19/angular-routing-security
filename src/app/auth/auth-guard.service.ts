import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';
import {ErrorHandlerService} from '../error/error-handler.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  public routePreviousToLogin: string;

  constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('canActivate start');
    this.routePreviousToLogin = null;

    if (!this.authService.currentUser.isLogged()) {
      this.routePreviousToLogin = state.url;
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
