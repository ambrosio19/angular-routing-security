import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class ErrorHandlerService {

  constructor(private router: Router) {
  }

  public handlerHttpError(ex: any) {
    const status = _.get(ex, 'status');

    switch (status) {
      case '402':
        // TODO: handler error for fields form
        break;
      default:
        this.router.navigate(['error']);
    }
  }

  public handlerUserNotLogged() {
    this.router.navigate(['login']);
  }

  public handlerUserUnathorized() {
    this.router.navigate(['error/401']);
  }
}
