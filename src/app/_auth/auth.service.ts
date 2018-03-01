import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {distinctUntilChanged} from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

import {Constants} from '../app.constants';

import {UserStorage} from './models/user-storage.class';
import {UserAuth} from './models/user-auth.class';
import {CurrentUser} from './models/current-user.class';

@Injectable()
export class AuthService {
  public currentUserSubject = new BehaviorSubject<CurrentUser>(new CurrentUser());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private httpClient: HttpClient) {
  }

  public getCurrentUser(): CurrentUser {
    return this.currentUserSubject.value;
  }

  public async initCurrentUserFromStorage() {
    try {

      if (!_.isNil(this.getUserToken())) {
        const userAuth: UserAuth = await this.fetchUserAuth();

        const newCurrentUser = new CurrentUser();
        newCurrentUser.user = userAuth;
        this.currentUserSubject.next(newCurrentUser);
      }

    } catch (ex) {
      throw ex;
    }
  }

  public async login(username: string, password: string) {
    try {
      const userStorage: UserStorage = await this.fetchLogin(username, password);
      this.setUserStorage(userStorage);

      await this.initCurrentUserFromStorage();
    } catch (ex) {
      throw ex;
    }
  }

  public async refreshToken() {
    try {

      const refreshToken = this.getRefreshToken();
      if (!_.isNil(refreshToken)) {
        const userStorage: UserStorage = await this.fetchRefreshToken(refreshToken);
        this.setUserStorage(userStorage);
      }

    } catch (ex) {
      throw ex;
    }
  }

  public logout(): any {
    this.currentUserSubject.next(new CurrentUser());
    this.deleteUserStorage();
  }

  public getUserToken(): string {
    const userStorage: UserStorage = this.getUserStorage();
    return _.isNil(userStorage) ? null : userStorage.token;
  }

  private getRefreshToken(): string {
    const userStorage: UserStorage = this.getUserStorage();
    return _.isNil(userStorage) ? null : userStorage.refreshToken;
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
    return this.httpClient.post<UserStorage>('/api/token', {username, password}).first().toPromise();
  }

  private fetchRefreshToken(refreshToken: string): Promise<UserStorage> {
    return this.httpClient.post<UserStorage>('/api/refreshToken', {refreshToken}).first().toPromise();
  }

  private fetchUserAuth(): Promise<UserAuth> {
    return this.httpClient.get<UserAuth>('/api/me').first().toPromise();
  }

  // TODO: Remove. Only for testing
  public fetchCallAPI(): Promise<any> {
    return this.httpClient.get<any>('/api/data').first().toPromise();
  }
}
