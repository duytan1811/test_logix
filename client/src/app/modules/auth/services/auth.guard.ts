import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthState } from '../states/auth.state';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authState: AuthState) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authState.currentUserValue;

    // check token expired
    var token = localStorage.getItem(`${environment.appVersion}-${environment.USERDATA_KEY}`)
    if (token) {
      var decryptToken = jwt_decode<any>(token);
      var expiredTime = decryptToken["exp"];
      if ((Math.floor((new Date).getTime() / 1000)) >= expiredTime) {
        console.log(123);
        this.authState.logout();
        window.location.href = '/auth/login';
        return false;
      }
    }
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.authState.logout();
    return false;
  }
}
