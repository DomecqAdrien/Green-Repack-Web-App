import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateCategorieComponent } from '../components/dialog/create-categorie/create-categorie.component';
import { Caracteristique } from '../model/Caracteristique';
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

  public async getProduitsByDepot(id: Number): Promise<any>{
    return await this.getApi<any>({
      url: '/produits/depot/' +id
    });
  }

  public async getSellableProduits(): Promise<any> {
    return await this.getApi<any>({
      url: '/produits/a-vendre'
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

  public async createCategorie(libelle: string): Promise<any> {
    return await this.postApi<any>({
      url: '/categorie',
      data: {libelle}
    });
  }

  public async createCaracteristique(carac: Caracteristique): Promise<any>{
    return await this.postApi<any>({
      url: '/caracteristique_tech',
      data: carac
    })
  }

  public async createUnite(unite: Unite): Promise<any>{
    return await this.postApi<any>({
      url: '/unite',
      data: unite
    })
  }

  public async createPrixVente(prixVente: PrixVente): Promise<any>{
    return await this.postApi<any>({
      url: '/prix_vente',
      data: prixVente
    })
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
