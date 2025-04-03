import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, baseUrlProducts } from '../apiRoot/baseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }
  allProducts():Observable<any>{
    return this._httpClient.get(`${baseUrlProducts}`);
  }
  getDetails(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrlProducts}/${id}`);
  }
}

