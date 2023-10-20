import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { API_DADATA_KEY } from 'src/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _loginService: LoginService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){

    if(request.url.match('dadata')) {
      const authToken = API_DADATA_KEY;
      const authReq = request.clone({ setHeaders: { Authorization: `Token ${authToken}` } });

      return next.handle(authReq);
    } 
    
    const authToken = this._loginService.getAuthorizationToken();
    const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });

    return next.handle(authReq);
  }
}
