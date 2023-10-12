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
  public credentials : LoginForm;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
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
    
    this._http.post<string>(`${API_BASE}/auth/login`, form).pipe(
      tap((token) => {
        this.setToken(token);
        this.isAuthenticated.next(true);
        this.setCredentials(form);
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
  };

  setCredentials(form: LoginForm): void {
    this.credentials = form;  
    if(this.rememberMe) {
      localStorage.setItem('remember-me', 'true');
      localStorage.setItem('credentials', JSON.stringify(form));
    } else {
      sessionStorage.setItem('credentials', JSON.stringify(form));
    }
  };

  logout(): void {
    this.isAuthenticated.next(false);
    sessionStorage.clear();
    localStorage.clear();
  };
};
