import {APP_INITIALIZER} from '@angular/core';
import {AuthService} from './auth.service';

export let AuthInitializer = {
  provide: APP_INITIALIZER, useFactory: (authService: AuthService) => {
    return (): Promise<any> => authService.initCurrentUserFromStorage().first().toPromise();
  }, deps: [AuthService], multi: true
};
