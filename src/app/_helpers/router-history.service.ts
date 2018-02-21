import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/filter';


@Injectable()
export class RouterHistoryService {
  public previousUrlToLogin: string;
  public previousUrl: string;
  private currentUrl: string;

  constructor(private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  public hasPreviousUrlToLogin(): boolean {
    return !_.isNil(this.previousUrlToLogin);
  }

  public hasPreviousUrl(): boolean {
    return !_.isNil(this.previousUrl);
  }
}
