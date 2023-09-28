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
  public token: string | null;
  public redirectUrl: string;
  isAuthenticated = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {};

  setToken(token: string | null) {
    this.token = token
  }

  login(form: LoginForm){
    return this._http.post<string>(`${API_BASE}/auth/login`, form).pipe(
      tap((token) => {
        this.setToken(token);
        this.isAuthenticated.next(true);
        if (this.redirectUrl) {
          this._router.navigate([this.redirectUrl]);
          this.redirectUrl = '';
        }
      }
    ));
  };


  logout(): void {
    this.isAuthenticated.next(false);
  };
};
