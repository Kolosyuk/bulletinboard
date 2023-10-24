import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit{
  public massage: string
  constructor(
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.massage = this._activatedRoute.snapshot.queryParams['errorMessage'];
  };
};
