import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent {

  constructor(private router: Router) {
  }

  public edit(id: number) {
    this.router.navigate([`/users/${id}/edit`]);
  }

}
