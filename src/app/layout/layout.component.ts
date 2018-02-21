import {Component} from '@angular/core';
import {AuthService} from '../_auth/auth.service';
import {Router} from '@angular/router';
import {CurrentUser} from '../_auth/models/current-user.class';
import {BaseComponent} from '../_helpers/base.component';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends BaseComponent {

  constructor(public authService: AuthService, private router: Router) {
    super(authService);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
