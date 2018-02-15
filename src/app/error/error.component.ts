import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  public imageType: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.imageType = this.activatedRoute.snapshot.params['type'] || 'error';
  }




}
