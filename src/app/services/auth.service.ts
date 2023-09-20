import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged = false;

  constructor() { }

  logIn() {
    this.isLogged = true;
  }

  logOut() {
    this.isLogged = false;
  }
}
