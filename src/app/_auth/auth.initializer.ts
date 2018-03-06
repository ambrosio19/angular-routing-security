import {APP_INITIALIZER} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

export let AuthInitializer = {
  provide: APP_INITIALIZER,
  useFactory: (authService: AuthService) => {
    return () => authService.initCurrentUserFromStorage().catch((err, caught) => Observable.empty());
  }, deps: [AuthService], multi: true
};
