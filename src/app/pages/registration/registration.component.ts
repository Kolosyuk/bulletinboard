import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor (
    private _authenticationService: AuthenticationService
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
    this._authenticationService.registrationNewUser({
      login: login,
      name: this.registrationForm.value.name,
      password: this.registrationForm.value.userPass
    }).subscribe();
  };

}
