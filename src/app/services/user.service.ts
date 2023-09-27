import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationForm } from '../model/registration.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogined = false;

  private user: User;

  constructor(
    private _http: HttpClient
  ) { }

  checkAuth() {
    return this.isLogined
  };

  setStatus(value : boolean) {
    this.isLogined = value;
  };

  getCurrentUser(token: string) {
    return this._http.get<User>(
      'http://194.87.237.48:5000/users/current',
      { 
        headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
      }
    )
  };

  registrationNewUser(form: RegistrationForm){
    return this._http.post(
      'http://194.87.237.48:5000/auth/register',
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
    return this.user.id;
  };


  getName() {
    return this.user.name;
  };

  getPhone() {
    return this.user.phone;
  };

  getAdress() {
    return this.user.adress;
  };

  getAdvertisments() {
    return this.user.advertisments;
  };
};
