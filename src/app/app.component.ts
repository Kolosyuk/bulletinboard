import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { LoginForm } from './model/forms.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private credentials: LoginForm | null;

  constructor(
    private _loginService: LoginService
  ) {
    this.credentials = JSON.parse(localStorage.getItem('credentials') || '{}');
  }

  ngOnInit() {
    if(this.credentials) {
      this._loginService.login(this.credentials)
    }
  }
}
