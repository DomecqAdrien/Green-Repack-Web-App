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
  isAdmin = new BehaviorSubject<boolean>(false);
  isMarchand = new BehaviorSubject<boolean>(false);
  isTechnicien = new BehaviorSubject<boolean>(false);
  userRole: string;
  isUpdatePassword: boolean;

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async register(user: any): Promise<any> {
    return await this.postApi<any>({
      url: '/user',
      data: user
    });
  }

  public async updateUser(email: string, user: Utilisateur): Promise<any>{
    return await this.putApi<Utilisateur>({
      url: '/user/' + email,
      data: user
    });
  }

  public async login(user: any): Promise<any>{
    console.log(user);
    return await this.postApi<any>({
      url: '/login',
      data: user
    });
  }

  public async getUser(email: string): Promise<Utilisateur> {
    return await this.getApi<Utilisateur>({
      url: '/user/' + email
    });
  }

  public async deleteUser(id: number): Promise<any> {
    return await this.deleteApi<any>({
      url: '/user/' + id
    });
  }

  public async getTechniciens(): Promise<Utilisateur[]> {
    return await this.getApi<Utilisateur[]>({
      url: '/users/technicien'
    });
  }

  public async createTechnicien(technicien: Utilisateur): Promise<any> {
    return await this.postApi<any>({
      url: '/create-technicien',
      data: technicien
    });
  }

  public async getUsersByRole(role: string): Promise<any> {
    return await this.getApi<any>({
      url: '/users/' + role
    });
  }

  setIsLogged(isLogged: boolean): any {
      this.isLogged.next(isLogged);
      if (isLogged){
        this.setUserRole(this.getRole());
      }
  }

  logout(): any {
    localStorage.removeItem('green-repack-user-email');
    localStorage.removeItem('green-repack-user-tk');
    sessionStorage.clear();
    this.setIsLogged(false);
    this.setUserRole(null);
    // this.userRole = null;
  }

  setUserRole(userRole: any): void {
    this.userRole = userRole;
    this.isAdmin.next(this.userRole === 'Administrateur');
    this.isTechnicien.next(this.userRole === 'Technicien');
    this.isMarchand.next(this.userRole === 'Marchand');
  }

  // isAdmin(): boolean {
  //   return this.userRole === 'Administrateur';
  // }

  // isTechnicien(): boolean {
  //   console.log(this.userRole);
  //   return this.userRole === 'Technicien';
  // }

  // isMarchand(): boolean {
  //   return this.userRole === 'Marchand';
  // }

  getEmail(): string {
    return localStorage.getItem('green-repack-user-email');
  }

  loggedIn(): boolean {
    return localStorage.getItem('green-repack-user-email') != null && localStorage.getItem('green-repack-user-tk') != null;
  }

  getToken(): string {
    return localStorage.getItem('green-repack-user-tk');
  }

  getRole(): string {
    const decoded: any = jwt_decode(this.getToken());
    return decoded.role;
  }


  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }



}
