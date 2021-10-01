import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OffreService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
   }

   public async getOffersByUser(email: string): Promise<any>{
     return await this.getApi<any>({
       url: '/offres/user/' + email
     });
   }

   public async updateOfferStatus(id: Number, statut: string): Promise<any>{
    return await this.putApi<any>({
      url: '/offre/statut/' + id,
      data: {statut}
    });
   }
}
