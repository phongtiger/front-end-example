import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
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
  addSale(body: any): Observable<any> {
    return this.http.post(environment.url + '/orders/add-sale', body, {headers: httpOptions.headers});
  }
  findOne(id: string): Observable<any> {
    return this.http.get(environment.url + '/orders/'+ id,{headers: httpOptions.headers});
  }
  saveOne(body: any): Observable<any> {
    return this.http.put(environment.url + '/orders/', body,{headers: httpOptions.headers});
  }
  getExcel() : Observable<any> {
    return this.http.get(environment.url + '/orders/excel', {headers: httpOptions.headers, responseType: 'blob' });
  }

}
