import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuardService} from './_auth/auth-guard.service';

import {HomeComponent} from './home/home.component';
import {UserComponent} from './users/user.component';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './errors/error.component';
import {UserEditComponent} from './users/user-edit.component';
import {LayoutComponent} from './layout/layout.component';

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
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
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
    RouterModule.forRoot(appRoutes, // { enableTracing: true } // <-- debugging purposes only
    )
  ], exports: [
    RouterModule
  ]
})

export class AppRoutes {
}
