import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { API_BASE } from '../../environment';
import { LoginForm } from '../model/login.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public redirectUrl: string;
  public isAuthenticated = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {};

  setToken(token: string) {
    sessionStorage.setItem('auth-token', token)
  };

  getAuthorizationToken():string {
    const token = sessionStorage.getItem('auth-token') || '';
    return token
  };

  login(form: LoginForm){
    this._http.post<string>(`${API_BASE}/auth/login`, form).pipe(
      tap((token) => {
        this.setToken(token);
        this.isAuthenticated.next(true);
        if (this.redirectUrl) {
          this._router.navigate([this.redirectUrl]);
          this.redirectUrl = '';
        } else {
          this._router.navigate(["/"]);
         
        }
      }
    )).subscribe();
  };


  logout(): void {
    this.isAuthenticated.next(false);
    sessionStorage.clear();
  };
};
