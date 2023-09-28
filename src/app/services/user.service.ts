import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_BASE } from '../../environment';
import { RegistrationForm } from '../model/registration.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null;

  constructor(
    private _http: HttpClient
  ) { }


  clearUser(value : null) {
    this.user = value;
  };

  getCurrentUser(token: string) {
    return this._http.get<User>(
      `${API_BASE}/users/current`,
      { 
        headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
      }
    )
  };

  registrationNewUser(form: RegistrationForm){
    return this._http.post(
      `${API_BASE}/auth/register`,
      form
      ).pipe(
        map(res => {
          console.log(`Зарегистрирован пользователь с ID - ${res}`)
        })
      )
  };

  setUser(user : User) {
    this.user = user;
  };

  getId() {
    if(this.user) {
      return this.user.id;
    }
    return null
  };


  getName() {
    if(this.user) {
      return this.user.name;
    }
    return null
  };

  getPhone() {
    if(this.user) {
      return this.user.phone;
    }
    return null
  };

  getAdress() {
    if(this.user) {
      return this.user.adress;
    }
    return null
  };

  getAdvertisments() {
    if(this.user) {
      return this.user.advertisments;
    }
    return null
  };
};
