import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';

import 'rxjs/add/operator/filter';

import {AuthService} from './auth.service';
import {RouterHistoryService} from '../_helpers/router-history.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private routerHistoryService: RouterHistoryService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();

    this.routerHistoryService.previousUrlToLogin = null;
    if (!currentUser.isLogged()) {
      this.routerHistoryService.previousUrlToLogin = state.url;
      this.router.navigate(['login']);
      return false;
    }

    const allowRoles = route.data.allowRoles;
    if (!currentUser.hasAnyRoles(allowRoles)) {
      console.log(state.url);
      this.router.navigate(['error/401']);
      return false;
    }

    return true;
  }
}
