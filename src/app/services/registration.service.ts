import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationForm } from '../model/registration.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private _http: HttpClient
  ) { }

  registration(form: RegistrationForm) {
    this._http.post(
      'http://194.87.237.48:5000/auth/register',
      form
      );
  };
};