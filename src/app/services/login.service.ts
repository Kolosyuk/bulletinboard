import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { LoginForm } from '../model/login.interface';
import { tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public token: string | null;
  public redirectUrl: string;


  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _router: Router
  ) {};

  setToken(token: string) {
    this.token = token
  }

  login(form: LoginForm){

    return this._http.post<string>('http://194.87.237.48:5000/auth/login', form).pipe(
      tap((token) => {
        this.setToken(token);
        this._userService.setStatus(true);

        if (this.redirectUrl) {
          this._router.navigate([this.redirectUrl]);
          this.redirectUrl = '';
        }
      }
    ));
  };


  logout(): void {
    this.token = null;
    this._userService.setStatus(false);
  };
};
