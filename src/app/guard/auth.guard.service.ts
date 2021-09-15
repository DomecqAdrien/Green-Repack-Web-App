import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    return this.getUser();
  }
  getUser(): boolean {
    if (this.loginService.isTokenExpired()) {
      console.log('a');
      localStorage.removeItem('green-repack-user-email');
      localStorage.removeItem('green-repack-user-tk');
      this.router.navigate(['login']);
      return false;
    }
    if (this.loginService.loggedIn()) {
      console.log('b');
      return true;
    }
    else{
      console.log('c');
      this.router.navigate(['login']);
      return false;
    }
  }
}
