import { ErrorHandler, Injectable } from '@angular/core';
import { PrixVente } from '../model/PrixVente';
import { Produit } from '../model/Produit';
import { Unite } from '../model/Unite';
import { Vente } from '../model/Vente';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getProduits(): Promise<any> {
    return await this.getApi<any>({
      url: '/produits'
    });
  }

  public async getProduitById(id: number): Promise<Produit> {
    return await this.getApi<Produit>({
      url: '/produit/' + id
    });
  }


  public async createProduit(data: Vente): Promise<any> {
    return await this.postApi<any>({
      url: '/vente-produit',
      data
    });
  }

  public async getCategories(): Promise<any> {
    return await this.getApi<any>({
      url: '/categories'
    });
  }

  public async getCaracteristiques(): Promise<any> {
    return await this.getApi<any>({
      url: '/caracteristiques_tech'
    });
  }

  public async deleteCaracteristique(id: number): Promise<any> {
    return await this.deleteApi<any>({
      url: '/caracteristique_tech/' + id
    });
  }

  public async getPrixProduits(): Promise<PrixVente[]> {
    return await this.getApi<any>({
      url: '/prix_vente'
    });
  }

  public async getUnites(): Promise<Unite[]> {
    return await this.getApi<Unite[]>({
      url: '/unites'
    });
  }

}
