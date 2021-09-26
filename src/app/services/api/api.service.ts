import axios from 'axios';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AxiosInstance } from 'axios';
import { Options } from 'selenium-webdriver';

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
    private jwt = localStorage.getItem('green-repack-user-tk');
    private axiosClient: AxiosInstance;
    private errorHandler: ErrorHandler;

    constructor( errorHandler: ErrorHandler) {
        this.errorHandler = errorHandler;
        this.axiosClient = axios.create({
            timeout: 10000,
            headers : {
                Authorization: 'Bearer ' + this.jwt
            }
        });
    }

    public async getApi<T>(options: GetOptions): Promise<T> {
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

    public async postApi<T>(options: PostOptions): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'POST',
                url: this.apiUrl + options.url,
                data: options.data
            });

            return axiosResponse.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async putApi<T>(params: any): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'PUT',
                url: this.apiUrl + params.url,
                data: params.data
            });

            return axiosResponse.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteApi<T>(params: any): Promise<T> {
        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'DELETE',
                url: this.apiUrl + params.url
            });

            return axiosResponse.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async request<T>(params: any): Promise<T> {
        console.log(params);
        try {
            const axiosResponse = await this.axiosClient.request({
                url: params.url,
                method: params.method,
                data: params.data,
                params: params.params
            });
            return axiosResponse.data;
        } catch (error){
            return Promise.reject(error);
        }
    }
}

