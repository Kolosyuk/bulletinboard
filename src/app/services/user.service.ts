import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { RegistrationForm } from '../model/registration.interface';
import { BehaviorSubject, map, tap } from 'rxjs';
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
    this._loginService.isAuthenticated.pipe(
      tap(isAuth => {
        if(isAuth && this._loginService.token) {
          this.getCurrentUser(this._loginService.token);
        }
      })
    ).subscribe()
  };


  clearUser() {
    this.user.next(null);
  };

  getCurrentUser(token: string) {
    this._http.get<User>(
      `${API_BASE}/users/current`,
      { 
        headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
      }
    ).subscribe( user => this.setUser(user))
  };

  registrationNewUser(form: RegistrationForm){
    this._http.post(
      `${API_BASE}/auth/register`,
      form
      ).subscribe(id => {
        this._loginService.login(form);
      })
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
    console.log(this.user.getValue());
    
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
