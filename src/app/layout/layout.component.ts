import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import * as _ from 'lodash';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {CurrentUser} from '../auth/models/current-user.class';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  public items: MenuItem[];
  public userItems: MenuItem[];
  public currentUser: CurrentUser;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.currentUser;

    this.userItems = [
      {
        label: 'Logout',
        icon: 'fa-sign-out',
        command: () => this.logout()
      }
    ];

    this.items = [
      {
        label: 'Users',
        visible: this.authService.currentUser.hasAnyRoles(['ROLE_ADMIN', 'ROLE_USER'])
      },
      {
        label: 'Admin',
        visible: this.authService.currentUser.hasAnyRoles(['ROLE_ADMIN'])
      }
    ];
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
