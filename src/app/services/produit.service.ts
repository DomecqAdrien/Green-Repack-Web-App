import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getProduits(): Promise<any> {
    return await this.get<any>({
      url: '/produits'
    });
  }

}
