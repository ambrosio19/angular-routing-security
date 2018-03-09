import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/do';

@Injectable()
export class ApiMockInterceptorClass implements HttpInterceptor {

  constructor() {
  }

  public intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`API call: ${httpRequest.url}`);

    return Observable.of(null).mergeMap(() => {

      if (httpRequest.url.endsWith('/api/token') && httpRequest.method === 'POST') {
        if (httpRequest.body.username === 'admin') {
          const body = {
            token: '12345admin', refreshToken: 'R12345admin',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else if (httpRequest.body.username === 'user') {
          const body = {
            token: '12345user', refreshToken: 'R12345user',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else {
          return Observable.throw(new HttpResponse({status: 400, body: {}}));
        }
      }

      if (httpRequest.url.endsWith('/api/refreshToken') && httpRequest.method === 'POST') {
        if (httpRequest.body.refreshToken === 'R12345admin') {
          const body = {
            token: '12345admin', refreshToken: 'R12345admin',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else if (httpRequest.body.refreshToken === 'R12345user') {
          const body = {
            token: '12345user', refreshToken: 'R12345user',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else {
          return Observable.throw(new HttpResponse({status: 400, body: {}}));
        }
      }

      if (httpRequest.url.endsWith('/api/me') && httpRequest.method === 'GET') {
        if (httpRequest.headers.get('Authorization') === 'Bearer 12345admin') {
          const body = {
            name: 'Uncle Bob',
            email: `uncle-bob@postavy.cz`,
            roles: ['ROLE_ADMIN'],
            imageUrl: 'https://qph.ec.quoracdn.net/main-thumb-t-16115-200-rd2w6hdkyh0ioYnuG251TKJKduUcFbv2.jpeg',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else if (httpRequest.headers.get('Authorization') === 'Bearer 12345user') {
          const body = {
            name: 'Jhon Doe',
            email: `jhon-doeb@postavy.cz`,
            roles: ['ROLE_USER'],
            imageUrl: 'https://yt3.ggpht.com/-BJKw0mZ748I/AAAAAAAAAAI/AAAAAAAAAAA/IBGmO0AzkH4/s48-c-k-no-mo-rj-c0xffffff/photo.jpg',
          };
          return Observable.of(new HttpResponse({status: 200, body}));
        } else {
          return Observable.throw(new HttpResponse({status: 401, body: {}}));
        }
      }

      if (httpRequest.url.endsWith('/api/data') && httpRequest.method === 'GET') {
        if (httpRequest.headers.get('Authorization') === 'Bearer 12345admin' || httpRequest.headers.get('Authorization') === 'Bearer 12345user') {
          return Observable.of(new HttpResponse({status: 200, body: {}}));
        } else {
          return Observable.throw(new HttpResponse({status: 401, body: {}}));
        }
      }

      return next.handle(httpRequest);

    }).delay(600)
      .do(value => console.log(`API response: ${httpRequest.url} - status: ${value.status}`))
      .catch((err, caught) => {
        console.error(`API response: ${httpRequest.url} - status: ${err.status}`);
        return Observable.throw(err);
      });
  }
}

export let ApiMockInterceptor = {
  provide: HTTP_INTERCEPTORS, useClass: ApiMockInterceptorClass, multi: true
};
