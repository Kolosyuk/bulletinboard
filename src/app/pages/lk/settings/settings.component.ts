import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Suggestion } from 'src/app/model/dadata.interface';
import { LoginForm } from 'src/app/model/forms.interface';
import { DadataService } from 'src/app/services/dadata.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public settingsForm: UntypedFormGroup;
  public newPasswordForm: UntypedFormGroup;
  public isVisibleConformation: boolean = false;
  public isVisiblePassConformation: boolean = false;
  public isVisiblePassError: boolean = false;
  public  filteredAddress: Suggestion[];  
  

  constructor(
    private _fb:FormBuilder,
    private _userService: UserService,
    private _loginService: LoginService,
    private _dadataService: DadataService,
  ){
    this._createSettingsForm();
    this._createNewPasswordForm();
  };

  _createSettingsForm() {
    this.settingsForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [''],
      location: [''],
    });
  };

  _createNewPasswordForm() {
    this.newPasswordForm = this._fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  };

  filterAddress(event: AutoCompleteCompleteEvent ) {
    this._dadataService.getSuggestion(event.query).subscribe( (value) => {
      if(value) {
        this.filteredAddress = value.suggestions
      }
    })
  }

  _setVisibleConformation() {
    this.isVisibleConformation = true;
    setTimeout(() => {
      this.isVisibleConformation = false;
    },2000)
  };

  _setVisiblePassConformation() {
    this.isVisiblePassConformation = true;
    setTimeout(() => {
      this.isVisiblePassConformation = false;
    },2000)
  };

  _setVisiblePassValidation() {
    this.isVisiblePassError = true;
    setTimeout(() => {
      this.isVisiblePassError = false;
    },2000)
  };

  saveSettings() {
    console.log('settings saved');
    this._setVisibleConformation();    
  };

  saveNewPassword() {
    if(!this._comparePasswords()) {
      this._setVisiblePassValidation();
      return
    }
    const newCredentials: LoginForm = {
      login: this.newPasswordForm.get('login')?.value,
      password: this.newPasswordForm.get('newPassword')?.value
    }
    this._setVisiblePassConformation();
    const fd: FormData = this._createPasswordFD();
    this._userService.updateUserPassword(fd);
    this._loginService.setCredentials(newCredentials);
  };

  _createPasswordFD(): FormData {
    const fd = new FormData();
    const login = this._loginService.credentials.login;
    const password = this.newPasswordForm.get('newPassword')?.value
    fd.append('Name', this._userService.getName()!);
    fd.append('Login', login);
    fd.append('Password', password);
    return fd;
  };

  _comparePasswords(): boolean {
    const currentPassword = this._loginService.credentials.password
    const confirmCurrentPassword = this.newPasswordForm.get('oldPassword')?.value
    return currentPassword === confirmCurrentPassword
  };
}
