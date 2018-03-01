import {APP_INITIALIZER} from '@angular/core';
import {AuthService} from './auth.service';

export let AuthInitializer = {
  provide: APP_INITIALIZER, useFactory: (authService: AuthService) => {
    return () => authService.initCurrentUserFromStorage().catch(() => {
      return;
    });
  }, deps: [AuthService], multi: true
};
