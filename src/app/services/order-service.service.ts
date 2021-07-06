import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }

  getOrderByMarketing(params: any): Observable<any> {
    return this.http.get(environment.url + '/orders/marketing', {headers: httpOptions.headers, params: params});
  }
  getOrderBySale(params: any): Observable<any> {
    return this.http.get(environment.url + '/orders/sale', {headers: httpOptions.headers, params: params});
  }
}
