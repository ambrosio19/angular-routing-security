import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserComponent} from './user.component';

@Component({
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  ngOnInit(): void {
   this.parentComponent.reloadFromChild();
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private parentComponent: UserComponent) {
  }

  closeDialog() {
    // TODO: abstract component childModal
    const parentUrl = `/${this.activatedRoute.parent.snapshot.url.join('/')}`;
    this.router.navigate([parentUrl]);
  }

}
