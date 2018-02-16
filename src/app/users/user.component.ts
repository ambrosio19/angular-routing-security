import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent {
  public users: any[];

  constructor(private router: Router) {
    this.users = [{
      id: 1, username: 'courtney.jenkins@example.com', name: 'Courtney Jenkins'
    }, {
      id: 2, username: 'gabriel.mcdonnell@fakemail.com', name: 'Gabriel McDonnell'
    }, {
      id: 3, username: 'brooke.mcdonnell@example.com', name: 'Brooke McDonnell'
    }, {
      id: 4, username: 'matthew.webb@fakemail.com', name: 'Matthew Webb'
    }, {
      id: 5, username: 'janet.gibson@test.com', name: 'Janet Gibson'
    }, {
      id: 6, username: 'henrik.cooper@example.com', name: 'Henrik Cooper'
    }, {
      id: 7, username: 'sofia.stewart@fakemail.com', name: 'Sofia Stewart'
    }, {
      id: 8, username: 'adam.dunn@fakemail.com', name: 'Adam Dunn'
    }, {
      id: 9, username: 'courtney.scott@test.com', name: 'Courtney Scott'
    }, {
      id: 10, username: 'freddie.boyd@example.com', name: 'Freddie Boyd'
    }];

  }

  public reloadFromChild() {
    console.log('RELOAD');
  }

  public edit(user: any) {
    this.router.navigate([`/users/${user.id}/edit`]);
  }

  public getItems(user: any): MenuItem[] {
    return [{
      label: 'Delete',
      icon: 'fa-trash',
      routerLink: `/users/${user.id}/edit`
    }];
  }

}
