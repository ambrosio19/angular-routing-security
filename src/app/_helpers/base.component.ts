import {AuthService} from '../_auth/auth.service';
import {CurrentUser} from '../_auth/models/current-user.class';

export abstract class BaseComponent {
  public currentUser: CurrentUser;

  constructor(public authService: AuthService) {
    this.authService.currentUser.subscribe((currentUser: CurrentUser) => {
      this.currentUser = currentUser;
    });
  }

}
