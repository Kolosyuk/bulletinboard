import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
    private _authService : AuthService,
    private _router: Router
    ) {
  };

  ngOnInit(): void {
    this.getScreenSize();
  };

  submit() {
    this._authService.logIn();
    this._router.navigate(['/'])
  };
}
