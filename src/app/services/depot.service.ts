import { ErrorHandler, Injectable } from '@angular/core';
import { Depot } from '../model/Depot';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DepotService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getDepots(): Promise<any> {
    return await this.getApi<any>({
      url: '/depots'
    });
  }

  public async createDepot(data: Depot): Promise<any> {
    return await this.postApi<any>({
      url: '/depot',
      data
    });
  }

}
