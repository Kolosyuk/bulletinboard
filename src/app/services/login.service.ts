import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { API_BASE } from '../../environment';
import { LoginForm } from '../model/forms.interface';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public isAuthenticated = new BehaviorSubject(false);
  public rememberMe: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    if (!!sessionStorage.getItem('auth-token')) {
      this.isAuthenticated.next(true);
    }
  };

  setToken(token: string) {
    sessionStorage.setItem('auth-token', token)
  };

  getAuthorizationToken():string {
    const token = sessionStorage.getItem('auth-token') || '';
    return token
  };

  login(form: LoginForm){
    const redirection = this._activatedRoute.snapshot.queryParams['redirectTo'];

    if(this.rememberMe) {
      localStorage.setItem('credentials', JSON.stringify(form));
    } else {
      sessionStorage.setItem('credentials', JSON.stringify(form));
    }
    
    this._http.post<string>(`${API_BASE}/auth/login`, form).pipe(
      tap((token) => {
        this.setToken(token);
        this.isAuthenticated.next(true);
        if (redirection) {
          this._router.navigate([`${redirection}`]);
        } else {
          this._router.navigate(["/"]);
        }
      }
    )).subscribe();
  };

  setRememberMe(status: boolean) {
    this.rememberMe = status;
  }

  logout(): void {
    this.isAuthenticated.next(false);
    sessionStorage.clear();
    localStorage.clear();
  };
};
