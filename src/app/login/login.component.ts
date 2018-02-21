import {ChangeDetectorRef, Component} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../_auth/auth.service';
import {Router} from '@angular/router';
import {RouterHistoryService} from '../_helpers/router-history.service';
import {BaseComponent} from '../_helpers/base.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent {
  public username: string;
  public password: string;

  constructor(public authService: AuthService, private router: Router, private routerHistoryService: RouterHistoryService) {
    super(authService);
  }

  public async login() {
    this.authService.logout();

    try {
      await this.authService.login(this.username, this.password);

      if (this.routerHistoryService.hasPreviousUrlToLogin()) {
        this.router.navigateByUrl(this.routerHistoryService.previousUrlToLogin);
        return;
      }

      this.router.navigate(['users']);
    } catch (ex) {
      // TODO: error handler
      if (_.get(ex, 'status') === 401) {
        alert('Username or Password wrong!');
      }
    }
  }
}
