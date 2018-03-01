import {Component} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../_auth/auth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../_helpers/base.component';
import {ErrorHandlerService} from '../_errors/error-handler.service';

@Component({
  templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  public username: string;
  public password: string;

  constructor(public authService: AuthService, private router: Router, private errorHandlerService: ErrorHandlerService) {
    super(authService);
  }

  public async login() {
    this.authService.logout();

    try {
      await this.authService.login(this.username, this.password);

      if (this.errorHandlerService.hasPreviousUrlToLogin()) {
        this.router.navigateByUrl(this.errorHandlerService.previousUrlToLogin);
        return;
      }

      this.router.navigate(['users']);
    } catch (ex) {
      // TODO: error handler
      if (_.get(ex, 'status') === 400) {
        alert('Username or Password wrong!');
      }
    }
  }
}
