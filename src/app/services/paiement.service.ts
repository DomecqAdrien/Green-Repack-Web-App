import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementService extends ApiService {

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async checkout(data: any): Promise<string> {
    return await this.postApi<any>({
        url: '/checkout',
        data
    });
  }

}
