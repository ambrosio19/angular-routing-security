import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterHistoryService} from '../_helpers/router-history.service';

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  public imageType: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerHistoryService: RouterHistoryService) {
  }

  ngOnInit(): void {
    this.imageType = this.activatedRoute.snapshot.params['type'] || 'error';
  }

  canGoBack() {
    console.log(this.routerHistoryService.previousUrl);
    return this.routerHistoryService.hasPreviousUrl();
  }

  goBack() {
    this.router.navigateByUrl(this.routerHistoryService.previousUrl);
  }


}
