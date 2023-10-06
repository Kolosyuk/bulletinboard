import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public scrHeight: number;
  public  scrWidth: number;
  public loginForm: FormGroup = new FormGroup({
    userPhone: new FormControl('', [
    Validators.required,
    Validators.minLength(10)
    ]),
    userPass: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
    rememberMe: new FormControl()
  });

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  };

  constructor(
    private _loginService : LoginService,
    private _router: Router
    ) {
  };

  ngOnInit(): void {
    this.getScreenSize();
    if (this._loginService.isAuthenticated.getValue()) {
      this._router.navigate(['/']);
    }
  };

  submit() {
    //TODO crutch - server "login" -- design layout "phone number"
    const login = this.loginForm.value.userPhone.replaceAll('-',"").replace('+','');

    this._loginService.login({
      login: login,
      password: this.loginForm.value.userPass
    });
  };
};
