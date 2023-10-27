import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { LoginForm } from './model/forms.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private credentials: LoginForm | null;

  constructor(
    private _loginService: LoginService,
    private _messageService: MessageService
  ) {
    if (!!localStorage.getItem('remember-me')) {
      this.credentials = JSON.parse(localStorage.getItem('credentials')!);
    }
  };

  ngOnInit(): void {
    if(this.credentials) {
      this._loginService.login(this.credentials, true, this._messageService);
    }
  };
};
