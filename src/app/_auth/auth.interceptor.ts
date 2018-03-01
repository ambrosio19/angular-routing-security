import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

import {AuthService} from './auth.service';
import {Subject} from 'rxjs/Subject';
import {ErrorHandlerService} from '../_errors/error-handler.service';

@Injectable()
export class AuthInterceptorClass implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private tokenRefreshedSubject = new Subject();
  private tokenRefreshed = this.tokenRefreshedSubject.asObservable();

  constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService) {
  }

  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {

    if (!httpRequest.headers.has('Content-Type')) {
      httpRequest = this.addHeaderContentType(httpRequest);
    }

    if (!httpRequest.headers.has('Authorization')) {
      httpRequest = this.addHeaderAuthorization(httpRequest);
    }

    return next.handle(httpRequest).catch(err => {

      if (err.status === 401) {
        return this.refreshToken()
          .switchMap(() => {
            httpRequest = this.addHeaderAuthorization(httpRequest);
            return next.handle(httpRequest);
          })
          .catch(() => {
            this.errorHandlerService.unauthorizedUser();
            return Observable.throw(err);
          });
      }

      return Observable.throw(err);
    });
  }

  private addHeaderContentType(httpRequest: HttpRequest<any>): HttpRequest<any> {
    return httpRequest.clone({
      headers: httpRequest.headers.set('Content-Type', 'application/json;Charset=UTF-8')
    });
  }

  private addHeaderAuthorization(httpRequest: HttpRequest<any>): HttpRequest<any> {
    const userToken: string = this.authService.getUserToken();
    if (userToken == null) {
      return httpRequest;
    }

    return httpRequest.clone({
      headers: httpRequest.headers.set('Authorization', 'Bearer ' + userToken)
    });
  }

  private refreshToken(): Observable<any> {

    return new Observable(observer => {

      if (this.refreshTokenInProgress) {

        this.tokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        });

      } else {

        this.refreshTokenInProgress = true;

        this.authService.refreshToken()
          .then(() => {
            this.refreshTokenInProgress = false;
            this.tokenRefreshedSubject.next();
            observer.next();
            observer.complete();
          }).catch(err => observer.error(err));
      }

    });
  }
}

export let AuthInterceptor = {
  provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorClass, multi: true
};
