import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/Utilisateur';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged = new BehaviorSubject<boolean>(false);
  currentUser: Utilisateur;
  userRole: string;
  initialized = false;
  isLoading = false;
  isUpdatePassword: boolean;

  constructor(private http: HttpClient) { }

  getIsLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
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

  authenticate(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/authenticate-gigya', data);
  }

  createAccount(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/registration-gigya', data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/resetPassword-gigya', data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/updatePassword-gigya', data);
  }

  async initCurrentUser(): Promise<any> {
    if (!this.isLoading && !this.currentUser) {
      this.isLoading = true;
      // await this.updateCurrentUser();
      this.isLoading = false;
      this.initialized = true;
    }
    return Promise.resolve(this.initialized);
  }

  /*async updateCurrentUser(): Promise<any> {
      const users = this.userService.entities();
      users.expand('roleUtilisateur,stations');
      users.filter({emailUtilisateur: this.getEmail()});
      const result = await users.get().toPromise();
      this.currentUser = result[0][0];
      this.userRole = this.currentUser.role;
  }*/

  /**
   * this is the first call required !
   * @returns user promise
   */
  async getCurrentUser(): Promise<Utilisateur> {
    if (!this.initialized) {
      await this.initCurrentUser();
    }
    return this.currentUser;
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

export class jwtToken {

}
