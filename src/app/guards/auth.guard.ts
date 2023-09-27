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
      private loginService: LoginService,
      private router: Router,
      private userService: UserService
      ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.userService.checkAuth()) { return true; }

    this.loginService.redirectUrl = url;

    this.router.navigate(['/login']);
    return false;
  }
}