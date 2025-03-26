import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../apiRoot/baseUrl';
import { Observable } from 'rxjs';
import { ILogin, IRegister } from '../interfaces/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  register(registerData: IRegister): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users`, registerData);
  }
  login(loginUser: ILogin): Observable<any> {
    return this._httpClient.post(`${baseUrl}/api/users/auth`, loginUser);
  }

  authorized(): boolean {
    return localStorage.getItem('token') != null;
  }
}
