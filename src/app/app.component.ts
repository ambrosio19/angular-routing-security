import {Component} from '@angular/core';
import {BaseComponent} from './_shared/base.component';
import {AuthService} from './_auth/auth.service';

@Component({
  selector: 'app-root', template: '<router-outlet></router-outlet>'
})
export class AppComponent extends BaseComponent {

  constructor(public authService: AuthService) {
    super(authService);
  }

}
