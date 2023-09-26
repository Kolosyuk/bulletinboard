import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

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
    private _authenticationService : AuthenticationService,
    private _router: Router
    ) {
  };

  ngOnInit(): void {
    this.getScreenSize();
  };

  submit() {
    //TODO crutch - server "login" -- design maket "phone number"
    const login = this.loginForm.value.userPhone.replaceAll('-',"").replace('+','');
    this._authenticationService.login({
      login: login,
      password: this.loginForm.value.userPass
    }).subscribe();

  };
}
