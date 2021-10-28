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

   public async updateOfferStatus(id: number, statut: string): Promise<any>{
    return await this.putApi<any>({
      url: '/offre/statut/' + id,
      data: {statut}
    });
   }

   public async createContreOffre(id: number, prix: number): Promise<any>{
    return await this.postApi<any>({
      url: '/contre-offre/' + id,
      data: {prix}
    });
   }

   public async getPrixVenteByTitre(titre: string): Promise<any>{
    return await this.getApi<any>({
      url: '/prix_vente/titre/' + titre,
    });
   }
}
