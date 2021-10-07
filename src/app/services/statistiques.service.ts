import { ErrorHandler, Injectable } from '@angular/core';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService extends ApiService{

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async getStatistiques(): Promise<any> {
    return await this.getApi<any>({
      url: '/statistics'
    });
  }
}
