import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root'
})
export class IsTechnicien implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(): boolean {
    const role = this.userService.getRole();
    return role === 'Technicien' || role === 'Administrateur';
  }
}
