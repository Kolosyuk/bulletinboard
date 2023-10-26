import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let url: string = state.url;
    return checkLogin(url);
};

function checkLogin(url: string): boolean {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated.getValue()) { return true; }

  router.navigate([`/login`], {queryParams: {redirectTo: url}});
  return false;
};

