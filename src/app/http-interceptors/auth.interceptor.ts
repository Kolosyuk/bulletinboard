import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Observable, catchError, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _loginService: LoginService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){

    const authToken = this._loginService.getAuthorizationToken();

    const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });

    return next.handle(authReq);
  }
}
