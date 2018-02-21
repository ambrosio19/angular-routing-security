import {APP_INITIALIZER} from '@angular/core';
import {AuthService} from './auth.service';

function AuthInitializerFactory(authService: AuthService): Function {
  return () => authService.initCurrentUserFromStorage();
}

export let AuthInitializer = {
  provide: APP_INITIALIZER,
  useFactory: AuthInitializerFactory,
  deps: [AuthService],
  multi: true
};
