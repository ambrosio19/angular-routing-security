import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/observable';

import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptorClass implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!httpRequest.headers.has('Content-Type')) {
      httpRequest = httpRequest.clone({
        headers: httpRequest.headers.set('Content-Type', 'application/json;Charset=UTF-8')
      });
    }

    if (!httpRequest.headers.has('Authorization')) {
      const userToken: string = this.authService.getUserTokenFromStorage();
      if (userToken != null) {
        httpRequest = httpRequest.clone({
          headers: httpRequest.headers.set('Authorization', 'Bearer ' + userToken)
        });
      }
    }

    return next.handle(httpRequest);
  }
}

export let AuthInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorClass,
  multi: true
};
