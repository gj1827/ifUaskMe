import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //baseUrl = 'http://localhost:3000';
  baseUrl = 'https://studenti.sum.ba/ifuaskme';
  constructor(private _http: HttpClient) {
  }
  getTypeRequest(url: any) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }
  postTypeRequest(url: any, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
  putTypeRequest(url: any, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }
  deleteTypeRequest(url: any, payload: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: payload,
    };

    return this._http.delete(`${this.baseUrl}${url}`, options).pipe(map(res => {
      return res;
    }));
  }
}