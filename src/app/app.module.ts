import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import {LoginComponent} from './login.component';
import {AppRoutes} from './app.routes';
import {ErrorHandlerService} from './error/error-handler.service';

export function AuthStartupServiceFactory(authService: AuthService): Function {
  return () => authService.initCurrentUserFromStorage();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, AdminComponent, UserComponent, LoginComponent],
  imports: [BrowserModule, FormsModule, AppRoutes],
  providers: [AuthService, AuthGuardService, ErrorHandlerService,
    {
      provide: APP_INITIALIZER, useFactory: AuthStartupServiceFactory, deps: [AuthService], multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
