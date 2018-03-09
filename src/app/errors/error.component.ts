import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ErrorHandlerService} from '../_shared/error-handler.service';

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  public imageType: string;

  constructor(private activatedRoute: ActivatedRoute, private errorHandlerService: ErrorHandlerService) {
  }

  ngOnInit(): void {
    this.imageType = this.activatedRoute.snapshot.params['type'] || 'error';
  }

  canGoBack() {
    return this.errorHandlerService.hasPreviousUrl();
  }

  goBack() {
    return this.errorHandlerService.goBack();
  }

}
