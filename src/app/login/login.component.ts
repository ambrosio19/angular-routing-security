import {Component} from '@angular/core';
import * as _ from 'lodash';
import {AuthService} from '../_auth/auth.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../_helpers/base.component';
import {ErrorHandlerService} from '../_errors/error-handler.service';

import 'rxjs/add/operator/catch';

@Component({
  templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
  public username: string;
  public password: string;

  constructor(public authService: AuthService, private router: Router, private errorHandlerService: ErrorHandlerService) {
    super(authService);
  }

  public login() {
    this.authService.logout();

    this.authService.login(this.username, this.password).subscribe(() => {
      if (this.errorHandlerService.hasPreviousUrlToLogin()) {
        this.router.navigateByUrl(this.errorHandlerService.previousUrlToLogin);
        return;
      }

      this.router.navigate(['users']);
    }, err => {
      // TODO: error handler
      if (_.get(err, 'status') === 400) {
        alert('Username or Password wrong!');
      }
    });
  }
}
