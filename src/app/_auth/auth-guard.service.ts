import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';
import {ErrorHandlerService} from '../_errors/error-handler.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser.isLogged()) {
      this.errorHandlerService.unauthorizedUser(state.url);
      return false;
    }

    const allowRoles = route.data.allowRoles;
    if (!currentUser.hasAnyRoles(allowRoles)) {
      this.errorHandlerService.unauthorizedRole();
      return false;
    }

    return true;
  }
}
