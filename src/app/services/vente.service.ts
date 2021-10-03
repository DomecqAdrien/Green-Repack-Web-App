import { ErrorHandler, Injectable } from '@angular/core';
import { Vente } from '../model/Vente';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VenteService extends ApiService {

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getVentesEnCours(): Promise<Vente[]> {
    return await this.getApi({
      url: '/ventes/en-cours'
    });
  }

  public async getVentesAnnulees(): Promise<Vente[]> {
    return await this.getApi({
      url: '/ventes/annule'
    });
  }

  public async getVentesTerminees(): Promise<Vente[]> {
    return await this.getApi({
      url: '/ventes/termine'
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

  public async validateVente(venteId: Number, offreId: Number, statut:string): Promise<any> {
    return await this.putApi({
      url: '/validate-vente/',
      data:{
        venteId,
        offreId,
        statut
      }
    });
  }
}
