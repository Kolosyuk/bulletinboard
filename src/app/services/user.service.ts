import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { LoginForm, RegistrationForm } from '../model/forms.interface';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { Advert } from '../model/advert.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userName: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public userAdverts: BehaviorSubject<Advert[]|null> = new BehaviorSubject<Advert[]|null>(null);
  public userId: string|null;

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

  clearUser():void {
    this.userId = null;
    this.userName.next(null);
    this.userAdverts.next(null);
  };

  getCurrentUser(): void {
    this._http.get<User>(`${API_BASE}/users/current`)
      .subscribe( user => {
        this.userId = user.id;
        this.userName.next(user.name);
        this.userAdverts.next(user.adverts);
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
    this._http.put(`${API_BASE}/Users/${this.userId}`, form)
    .subscribe((data) => console.log(data));
  };
};
