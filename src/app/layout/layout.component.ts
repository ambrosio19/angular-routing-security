import {Component} from '@angular/core';
import {AuthService} from '../_auth/auth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../_helpers/base.component';
import {Constants} from '../app.constants';

@Component({
  templateUrl: './layout.component.html', styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent {

  constructor(public authService: AuthService, private router: Router) {
    super(authService);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // TODO: Remove. Only for testing
  public revokeToken() {
    const userStorage = JSON.parse(localStorage.getItem(Constants.localStorage.user));
    userStorage.token = 'revokeToken';
    localStorage.setItem(Constants.localStorage.user, JSON.stringify(userStorage));
  }

  // TODO: Remove. Only for testing
  public revokeRefreshToken() {
    const userStorage = JSON.parse(localStorage.getItem(Constants.localStorage.user));
    userStorage.refreshToken = 'revokeRefreshToken';
    localStorage.setItem(Constants.localStorage.user, JSON.stringify(userStorage));
  }

  // TODO: Remove. Only for testing
  public fetchData() {
    this.authService.fetchCallAPI();
  }

}
