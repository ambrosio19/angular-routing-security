import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthGuardService} from './auth/auth-guard.service';

import {HomeComponent} from './home.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user.component';
import {LoginComponent} from './login.component';

const appRoutes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  {
    // TODO: el path: '' debería ser la LP
    path: 'test',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService],
        data: {
          allowRoles: ['ROLE_USER', 'ROLE_ADMIN']
        }
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuardService],
        data: {
          allowRoles: ['ROLE_USER']
        }
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
  //{ path: '', redirectTo: 'login' },
  //{ path: '**', redirectTo: 'login' },
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

export class AppRoutes {}
