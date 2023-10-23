import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
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
          case 404:
            this._router.navigate(['/not-found'])
            console.log('this', error.error)
            return of(new HttpResponse({
              body: error.error
            }));            
        
          default:
            return throwError('server error');
        }
      })
    );
  }
}

