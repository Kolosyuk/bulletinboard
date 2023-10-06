import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { RegistrationForm } from '../model/registration.interface';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<User|null>(null);;

  constructor(
    private _http: HttpClient,
    private _loginService: LoginService,
  ) { 
    this._loginService.isAuthenticated.subscribe((status) => {
      if (status) {
        this.getCurrentUser();
      } else {
        this.clearUser()
      }
    })
  };

  clearUser() {
    this.user.next(null);
  };

  getCurrentUser() {
    this._http.get<User>(`${API_BASE}/users/current`)
      .subscribe( user => this.setUser(user))
  };

  registrationNewUser(form: RegistrationForm){
    this._http.post(`${API_BASE}/auth/register`, form)
    .subscribe(() => this._loginService.login(form));
  };

  setUser(user : User) {
    this.user.next(user)
  };

  getId() {
    if(this.user) {
      return this.user.getValue()?.id;
    }
    return null
  };

  getName() {
    if(this.user) {
      return this.user.getValue()?.name;
    }
    return ''
  };

  getPhone() {
    if(this.user) {
      return this.user.getValue()?.phone;
    }
    return null
  };

  getAdress() {
    if(this.user) {
      return this.user.getValue()?.adress;
    }
    return null
  };

  getAdvertisments() {
    if(this.user) {
      return this.user.getValue()?.advertisments;
    }
    return null
  };
};
