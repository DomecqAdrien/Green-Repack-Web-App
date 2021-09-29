import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdmin implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const role = this.userService.getRole();
    return role === 'Administrateur';
  }
}
