import { Component } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CurrentUser} from '../auth/models/current-user.class';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public currentUser: CurrentUser;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  public logout() {
    this.authService.logout();
  }

}
