import axios from 'axios';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AxiosInstance } from 'axios';

export interface Params {
    [ key: string ]: any;
}

export interface GetOptions {
    url: string;
    params?: Params;
}

export interface PostOptions {
    url: string;
    data?: Params;
}

export interface ErrorResponse {
    id: string;
    code: string;
    message: string;
}

@Injectable({
  providedIn: 'root'
})



export class ApiService {
    private apiUrl: string = environment.apiUrl;
    private axiosClient: AxiosInstance;
    private errorHandler: ErrorHandler;

    constructor( errorHandler: ErrorHandler) {
        this.errorHandler = errorHandler;

        this.axiosClient = axios.create({
            timeout: 3000,
            headers : {
                'X-Initialized-At': Date.now().toString
            }
        });
    }

    public async get<T>(options: GetOptions): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'get',
                url: this.apiUrl + options.url,
                params: options.params
            });

            return axiosResponse.data;
        } catch (error){
            return Promise.reject(error);
        }
    }

    public async post<T>(options: PostOptions): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'post',
                url: this.apiUrl + options.url,
                data: options.data
            });

            return axiosResponse.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

