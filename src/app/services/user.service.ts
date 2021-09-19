import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from '../model/Utilisateur';
import { ApiService } from './api/api.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  isLogged = new BehaviorSubject<boolean>(false);
  currentUser: Utilisateur;
  userRole: string;
  initialized = false;
  isLoading = false;
  isUpdatePassword: boolean;

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async register(user: any): Promise<any> {
    return await this.post<any>({
      url: '/user',
      data: user
    });
  }

  public async login(user: any): Promise<any>{
    console.log(user);
    return await this.post<any>({
      url: '/login',
      data: user
    });
  }

  setIsLogged(isLogged: boolean): any {
      this.isLogged.next(isLogged);
  }

  logout(): any {
    localStorage.removeItem('green-repack-user-info');
    localStorage.removeItem('green-repack-user-email');
    localStorage.removeItem('green-repack-user-tk');
    sessionStorage.clear();
    this.setIsLogged(false);
    this.userRole = null;
    this.currentUser = null;
    this.initialized = false;
  }

  isAdmin(): boolean {
    return this.userRole !== 'ROLE_ADMIN';
  }

  isTechnicien(): boolean {
    return this.userRole === 'ROLE_TECHNICIEN';
  }

  getEmail(): string {
    return localStorage.getItem('green-repack-user-email');
  }

  loggedIn(): boolean {
    return localStorage.getItem('green-repack-user-email') != null && localStorage.getItem('green-repack-user-tk') != null;
  }

  getToken(): string {
    return localStorage.getItem('green-repack-user-tk');
  }


  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);
    console.log(decoded);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    console.log('a');
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    console.log(token);

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }



}
