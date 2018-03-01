import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  closeDialog() {
    // TODO: abstract component childModal
    const parentUrl = `/${this.activatedRoute.parent.snapshot.url.join('/')}`;
    this.router.navigate([parentUrl]);
  }

}
