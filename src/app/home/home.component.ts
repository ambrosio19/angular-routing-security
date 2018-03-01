import {Component} from '@angular/core';
import {AuthService} from '../_auth/auth.service';
import {BaseComponent} from '../_helpers/base.component';

@Component({
  templateUrl: './home.component.html', styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent {

  constructor(public authService: AuthService) {
    super(authService);
  }

  public logout() {
    this.authService.logout();
  }

}
