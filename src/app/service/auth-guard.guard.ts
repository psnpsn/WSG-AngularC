import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserInfoService } from './user-info.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private userInfoService: UserInfoService
) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute,state);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.userInfoService.isLoggedIn()) {
        return true;
    }
    console.log("User is not logged - This routing guard prvents redirection to any routes that needs logging.");
    //Store the original url in login service and then redirect to login page
    this.router.navigate(['/login']);
    return false;
}
}
