import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400: 
            return throwError(error);
          case 401:
            this._router.navigate(['/login']);
            return throwError(error);
          case 404:
            this._router.navigate(['/not-found']);
            return throwError(error);
        
          default:
            this._router.navigate([`/error-page`], {queryParams: { errorMessage: error.message }});
            return throwError(error);
        };
      })
    )
  };
};

