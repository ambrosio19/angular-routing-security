import {Component} from '@angular/core';
import {BaseComponent} from './_helpers/base.component';
import {AuthService} from './_auth/auth.service';

@Component({
  selector: 'app-root', template: 'APP<router-outlet></router-outlet>'
})
export class AppComponent extends BaseComponent {

  constructor(public authService: AuthService) {
    super(authService);
  }


}
