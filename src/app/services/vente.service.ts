import { ErrorHandler, Injectable } from '@angular/core';
import { Retour } from '../model/Retour';
import { Vente } from '../model/Vente';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VenteService extends ApiService {

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getVentesByStatus(status: string): Promise<Vente[]> {
    return await this.getApi({
      url: '/ventes/' + status
    });
  }
  public async getVenteById(id: number): Promise<Vente> {
    return await this.getApi({
      url: '/vente/infos/' + id
    });
  }

  public async getVentesByUserAndFinished(email: string): Promise<any> {
    return await this.getApi({
      url: '/ventes/user/' + email
    });
  }

  public async validateVente(venteId: number, offreId: number, statut: string): Promise<any> {
    return await this.putApi({
      url: '/validate-vente/',
      data: {
        venteId,
        offreId,
        statut
      }
    });
  }

  public async getRetoursByUser(email: string): Promise<Retour[]> {
    return await this.getApi({
      url: '/retour_produit/' + email
    });
  }

  public async refuseRetour(data: Retour): Promise<any> {
    return await this.postApi({
      url: '/retour/refuse',
      data
    });
  }

  public async checkoutRetour(data: Retour): Promise<any> {
    return await this.postApi({
      url: '/retour/checkout',
      data
    });
  }

  public async acceptRetour(key: any): Promise<any> {
    return await this.postApi({
      url: '/retour/accept',
      data: {key}
    });
  }
}
