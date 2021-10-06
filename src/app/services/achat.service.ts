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

   public async checkout(data: any): Promise<string> {
    return await this.postApi<any>({
        url: '/checkout',
        data
    });
  }

  public async validateAchat(transactionId: any): Promise<any> {
    return await this.putApi<any>({
      url: '/achat/validate',
      data: {transactionId}
    });
  }
}
