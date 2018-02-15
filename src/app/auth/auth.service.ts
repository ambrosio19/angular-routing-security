import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import {Constants} from '../app.constants';

import {UserStorage} from './user-storage.model';
import {UserAuth} from './user-auth.model';
import {CurrentUser} from './current-user.class';

@Injectable()
export class AuthService {
  public currentUser: CurrentUser;

  constructor() {
    this.currentUser = new CurrentUser();
  }

  public async initCurrentUserFromStorage() {
    try {
      console.log('initCurrentUserFromStorage: start');

      if (!_.isNil(this.getUserStorage())) {
        const userAuth: UserAuth = await this.fetchUserAuth();
        this.currentUser.user = userAuth;
      }

      console.log('initCurrentUserFromStorage: end');
    } catch (ex) {
      // TODO: ErrorHandler
      return ex;
    }
  }

  public async login(username: string, password: string) {
    try {
      const userStorage: UserStorage = await this.fetchLogin(username, password);
      this.setUserStorage(userStorage);

      await this.initCurrentUserFromStorage();
    } catch (ex) {
      // TODO: ErrorHandler
      return ex;
    }
  }

  public logout(): any {
    this.currentUser.user = null;
    this.deleteUserStorage();
  }

  public getUserTokenFromStorage(): string {
    const userStorage: UserStorage = this.getUserStorage();
    return _.isNil(userStorage) ? null : userStorage.token;
  }

  private setUserStorage(userStorage: UserStorage) {
    localStorage.setItem(Constants.localStorage.user, JSON.stringify(userStorage));
  }

  private getUserStorage(): UserStorage {
    const storageValue = localStorage.getItem(Constants.localStorage.user);
    return _.isNil(storageValue) ? null : JSON.parse(storageValue);
  }

  private deleteUserStorage() {
    localStorage.removeItem(Constants.localStorage.user);
  }

  private fetchLogin(username: string, password: string): Promise<UserStorage> {
    // MOCK: llamada al API para hacer login /api/login
    const fakeApiUserStorage: UserStorage = {
      name: 'Jhon Doe',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
    };
    return Observable.of(fakeApiUserStorage).delay(800).first().toPromise();
    // MOCK: end
  }

  private fetchUserAuth(): Promise<UserAuth> {
    // Al crear un interceptor http que añada el token a la cabecera nos dará el usuario actualmente autorizado
    // MOCK: llamada al API para obtener el usuario actual /api/me
    const fakeApiUserAuth: UserAuth = {
      name: 'Jhon Doe',
      email: 'jhon-doe@postavy.cz',
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      imageUrl: 'http://www.postavy.cz/foto/john-doe-foto.jpg',
    };
    return Observable.of(fakeApiUserAuth).delay(800).first().toPromise();
    // MOCK: end
  }
}
