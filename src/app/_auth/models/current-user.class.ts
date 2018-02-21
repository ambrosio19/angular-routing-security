import * as _ from 'lodash';
import {UserAuth} from './user-auth.class';

export class CurrentUser {
  public user: UserAuth;

  public isLogged(): boolean {
    return !_.isNil(this.user);
  }

  public hasRoles(roles: string[]): boolean {
    if (!this.isLogged()) {
      return false;
    }

    return _.difference(this.user.roles, roles).length === 0;
  }

  public hasAnyRoles(roles: string[]): boolean {
    if (!this.isLogged()) {
      return false;
    }

    return _.some(roles, role => _.includes(this.user.roles, role));
  }
}
