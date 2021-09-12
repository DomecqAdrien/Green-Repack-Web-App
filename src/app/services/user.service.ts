import { ErrorHandler, Injectable } from '@angular/core';
import { Utilisateur } from '../model/Utilisateur';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

    constructor(errorHandler: ErrorHandler) {
        super(errorHandler);
    }

    public async register(user: any): Promise<any> {
        return await this.post<any>({
            url: '/user',
            data: user
        });
    }

    public async login(username: string, password: string): Promise<any>{
        return await this.post<any>({
            url: '/login'
        });
    }

    public async loadUsers(): Promise<Utilisateur[]> {
        try {
            return await this.get<Utilisateur[]>({
                url: '/users'
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
