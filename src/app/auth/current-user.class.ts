import * as _ from 'lodash';
import {UserAuth} from './user-auth.model';

export class CurrentUser {
  public user: UserAuth;

  public isLogged(): boolean {
    return !_.isNil(this.user);
  }

  public hasAnyRoles(roles: string[]): boolean {
    if (!this.isLogged()) {
      return false;
    }

    return _.some(roles, role => _.includes(this.user.roles, role));
  }
}
