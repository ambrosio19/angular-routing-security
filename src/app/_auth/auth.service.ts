import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {distinctUntilChanged} from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import {Constants} from '../app.constants';

import {UserStorage} from './models/user-storage.class';
import {UserAuth} from './models/user-auth.class';
import {CurrentUser} from './models/current-user.class';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private currentUserSubject = new BehaviorSubject<CurrentUser>(new CurrentUser());
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private httpClient: HttpClient) {
  }

  public initCurrentUserFromStorage(): Observable<void> {
    if (!_.isNil(this.getUserToken())) {
      return this.fetchUserAuth().map((userAuth: UserAuth) => {
        this.setCurrentUser(userAuth);
      });
    }

    return Observable.empty();
  }

  public login(username: string, password: string): Observable<void> {
    return this.fetchLogin(username, password).flatMap((userStorage: UserStorage) => {
      this.setUserStorage(userStorage);

      return this.initCurrentUserFromStorage();
    });
  }

  public refreshToken(): Observable<void> {
      const refreshToken = this.getRefreshToken();

      if (!_.isNil(refreshToken)) {
        return this.fetchRefreshToken(refreshToken).map((userStorage: UserStorage) => {
          this.setUserStorage(userStorage);
        });
      }

      return Observable.empty();
  }

  public logout(): any {
    this.currentUserSubject.next(new CurrentUser());
    this.deleteUserStorage();
  }



  public getCurrentUser(): CurrentUser {
    return this.currentUserSubject.value;
  }

  public setCurrentUser(userAuth: UserAuth) {
    const newCurrentUser = new CurrentUser();
    newCurrentUser.user = userAuth;
    this.currentUserSubject.next(newCurrentUser);
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



  private fetchLogin(username: string, password: string): Observable<UserStorage> {
    return this.httpClient.post<UserStorage>('/api/token', {username, password});
  }

  private fetchRefreshToken(refreshToken: string): Observable<UserStorage> {
    return this.httpClient.post<UserStorage>('/api/refreshToken', {refreshToken});
  }

  private fetchUserAuth(): Observable<UserAuth> {
    return this.httpClient.get<UserAuth>('/api/me');
  }

  // TODO: Remove. Only for testing
  public fetchCallAPI(): Observable<any> {
    return this.httpClient.get<any>('/api/data');
  }
}
