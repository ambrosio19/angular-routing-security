import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TableModule} from 'primeng/table';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';

import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './users/user.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';
import {LoginComponent} from './auth/login.component';
import {AppRoutes} from './app.routes';
import {ErrorHandlerService} from './error/error-handler.service';
import {ErrorComponent} from './error/error.component';
import {UserEditComponent} from './users/user-edit.component';
import {LayoutComponent} from './layout/layout.component';
import {ShowWithRolesDirective} from './auth/utils/show-with-any-roles.component';

export function AuthStartupServiceFactory(authService: AuthService): Function {
  return () => authService.initCurrentUserFromStorage();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, AdminComponent, UserComponent, LoginComponent, ErrorComponent, UserEditComponent, LayoutComponent, ShowWithRolesDirective],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, AppRoutes, ButtonModule, InputTextModule, MenubarModule, TieredMenuModule, TableModule, SplitButtonModule, DialogModule],
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
