import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuardService} from './auth/auth-guard.service';

import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './users/user.component';
import {LoginComponent} from './auth/login.component';
import {ErrorComponent} from './error/error.component';
import {UserEditComponent} from './users/user-edit.component';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuardService],
    data: {
      allowRoles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuardService],
        data: {
          allowRoles: ['ROLE_ADMIN', 'ROLE_USER']
        },
        children: [
          {
            path: ':id/edit',
            component: UserEditComponent,
            canActivate: [AuthGuardService],
            data: {
              allowRoles: ['ROLE_ADMIN']
            }
          }
        ]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuardService],
        data: {
          allowRoles: ['ROLE_ADMIN']
        }
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'error/:type',
    component: ErrorComponent
  },
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutes {
}
