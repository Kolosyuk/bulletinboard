import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { LoginForm, RegistrationForm } from '../model/forms.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { Advert } from '../model/advert.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userName$: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  private _userAdverts$: BehaviorSubject<Advert[]> = new BehaviorSubject<Advert[]>([]);
  private _userId: string|null;

  constructor(
    private _http: HttpClient,
    private _loginService: LoginService,
  ){
    this._loginService.isAuthenticated.subscribe((status) => {
      if (status) {
        this.getCurrentUser();
      } else {
        this.clearUser()
      }
    });
  };

  setUserAdverts(userAdverts: Advert[]) {
    this._userAdverts$.next(userAdverts);
  }
  
  get userAdverts$() {
    return this._userAdverts$.asObservable();
  }

  setUserName(name: string) {
    this._userName$.next(name);
  }
  
  get userName$() {
    return this._userName$.asObservable();
  }

  clearUser():void {
    this._userId = null;
    this._userName$.next(null);
    this._userAdverts$.next([]);
  };

  getCurrentUser(): void {
    this._http.get<User>(`${API_BASE}/users/current`)
      .subscribe( user => {
        this._userId = user.id;
        this.setUserName(user.name);
        this.setUserAdverts(user.adverts);
    })
  };

  registrationNewUser(registrationForm: RegistrationForm, msgServiceInstance: MessageService):void{
    const loginForm: LoginForm = {
      login: registrationForm.login,
      password: registrationForm.password
    }
    this._http.post(`${API_BASE}/auth/register`, registrationForm)
    .subscribe(() => this._loginService.login(loginForm, false, msgServiceInstance));
  };

  updateUserPassword(form: FormData):void {
    this._http.put(`${API_BASE}/Users/${this._userId}`, form)
    .subscribe((data) => console.log(data));
  };
};
