import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor (
    private _userService: UserService
  ) {}


  public registrationForm: FormGroup = new FormGroup({
    userPhone: new FormControl('', [
    Validators.required,
    Validators.minLength(10)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
      ]),
    userPass: new FormControl('', [
      Validators.required,
      Validators.minLength(7)
    ]),
  });

  submit() {
    //TODO crutch - server "login" -- design layout "phone number"
    const login = this.registrationForm.value.userPhone.replaceAll('-',"").replace('+','');
    this._userService.registrationNewUser({
      login: login,
      name: this.registrationForm.value.name,
      password: this.registrationForm.value.userPass
    });
  };
}
