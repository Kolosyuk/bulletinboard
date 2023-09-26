import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { RegistrationForm } from '../model/registration.interface';
import { LoginForm } from '../model/login.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  public isLoggedIn = false;
  public token: string = '';
  public redirectUrl: string;


  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
      this.token = JSON.parse(localStorage.getItem('auth-token') || '{}');
    }

  login(form: LoginForm){

    return this._http.post('http://194.87.237.48:5000/auth/login', form).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('auth-token', JSON.stringify(token));
        this.isLoggedIn = true;
        // if (this.redirectUrl) {
        //   this._router.navigate([this.redirectUrl]);
        //   this.redirectUrl = '';
        // }
      }
    ))
  }


  logout(): void {
    localStorage.removeItem('auth-token');
    this.isLoggedIn = false;
  }

  async registrationNewUser(form: RegistrationForm){
    const resp = await this._http.post(
      'http://194.87.237.48:5000/auth/register',
      form
      );
  };

  async getCurrentUser() {
    await this._http.get(
      'http://194.87.237.48:5000/users/current',
      { 
        headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
      }
    )
  }
}
