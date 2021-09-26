import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    return this.getUser();
  }
  getUser(): boolean {
    if (this.userService.isTokenExpired()) {
      localStorage.removeItem('green-repack-user-email');
      localStorage.removeItem('green-repack-user-tk');
      this.router.navigate(['login']);
      return false;
    }
    if (this.userService.loggedIn()) {
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
