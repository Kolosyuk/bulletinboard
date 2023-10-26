import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from '../../environment';
import { LoginForm } from '../model/forms.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { MsgService } from './msg.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api/public_api';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public isAuthenticated = new BehaviorSubject(false);
  public rememberMe: boolean = false;
  public credentials : LoginForm;

  constructor(
    private _http: HttpClient,
    private _msgService: MsgService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  };

  setToken(token: string):void {
    sessionStorage.setItem('auth-token', token)
  };

  getAuthorizationToken():string {
    const token = sessionStorage.getItem('auth-token') || '';
    return token
  };

  login(form: LoginForm, rememberMe = false, msgServiceInstance: MessageService):void{
    const redirection = this._activatedRoute.snapshot.queryParams['redirectTo'];
    const loginForm: LoginForm = {
      login: form.login,
      password: form.password
    };
           
    this._http.post<string>(`${API_BASE}/auth/login`, loginForm).pipe(
            tap((token) => {
        this.setToken(token);
        this.isAuthenticated.next(true);
        // setRememberMe должен вызываться перед setCredentials
        this.setRememberMe(rememberMe);
        this.setCredentials(form);        
      }))
      .subscribe({
        next: (res) => {
          if (redirection) {
            this._router.navigate([`${redirection}`]);
          } else {
            this._router.navigate(["/"]);
          }
        },
        error:(errorResponse) => { 
          const message = errorResponse.error?.errors
          this._msgService.showError(message, msgServiceInstance);
        },
      })
  };

  setRememberMe(status: boolean):void {
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
