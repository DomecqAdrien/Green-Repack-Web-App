import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AchatService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
   }

   public async getAchatsByUser(email: string): Promise<any>{
     return await this.getApi<any>({
       url: '/achats/user/' + email
     });
   }
}
