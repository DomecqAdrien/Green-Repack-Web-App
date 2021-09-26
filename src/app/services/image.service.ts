import { ErrorHandler, Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { environment } from 'src/environments/environment';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiService {

  accessToken: string;

  constructor(errorHandler: ErrorHandler) {
    super(errorHandler);
  }

  public async uploadImage(data: string): Promise<any> {
    const formData = new FormData();
    formData.append('image', data.split(',')[1]);
    const params: AxiosRequestConfig = {};
    params.url =  'https://api.imgbb.com/1/upload?key=' + environment.bb;
    params.method = 'post';
    params.data = formData;
    return await this.request(params);
  }
}
