import { Injectable }       from '@angular/core';
import {
  CanActivate, 
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot 
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
      private _loginService: LoginService,
      private _router: Router,
      ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this._loginService.isAuthenticated.getValue()) { return true; }

    this._loginService.redirectUrl = url;

    this._router.navigate(['/login']);
    return false;
  }
}