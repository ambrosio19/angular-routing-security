import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandlerService {

  constructor(private router: Router) {
  }

  public handlerUserNotLogged() {
    this.router.navigate(['login']);
  }

  public handlerUserUnathorized() {
    this.router.navigate(['login']);
  }
}
