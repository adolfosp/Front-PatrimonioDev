import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriptografiaService } from '@nvs-services/criptografia/criptografia.service';
import { Observable } from 'rxjs';
import { IApi } from '../../models/interfaces/IApi';
import { TokenService } from './../token/token.service';

@Injectable()
export class ApiService implements IApi {

  private readonly options: any;

 //TODO: Passar para o service token
  constructor(private http: HttpClient, private encriptar: CriptografiaService, private token: TokenService) {

    this.options = {
        'Content-type': 'application/json'
     }
  }

  get<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.get<T>(url, {
      headers: {
       ...this.options,
       'Authorization': `Bearer ${this.token.obterTokenDescriptografado()}`,

      },
      ...options
     });
  }

  post<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
      headers: {
       ...this.options,
       'Authorization': `Bearer ${this.token.obterTokenDescriptografado()}`,
      },
      ...options
     });
  }

  postImage<T>(url: string, data: any, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, data, {
        headers: {
          'Authorization': `Bearer ${this.token.obterTokenDescriptografado()}`,
        },
      ...options
     });
  }

  put<T>(url: string, data: any, options?: any): Observable<T> {
       // @ts-ignore
       return this.http.put<T>(url, data, {
        headers: {
         ...this.options,
         'Authorization': `Bearer ${this.token.obterTokenDescriptografado()}`,
        },
        ...options
       });
  }

  delete<T>(url: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.delete<T>(url, {
      headers: {
      ...this.options,
      'Authorization': `Bearer ${this.token.obterTokenDescriptografado()}`,
      },
      ...options
    });
  }

  patch<T>(url: string, data: any, options?: any): Observable<T> {
    throw new Error('Method not implemented.');
  }


}
