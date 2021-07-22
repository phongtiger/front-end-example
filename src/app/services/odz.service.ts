import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OdzService {

  constructor(private http: HttpClient) {
  }

  findAllProvince(): Observable<any> {
    return this.http.get(environment.url + '/odz/province', {headers: httpOptions.headers});
  }
  findAllCityByProvince(params: any): Observable<any> {
    return this.http.get(environment.url + '/odz/city', {headers: httpOptions.headers, params});
  }
  findAllBarangayByCity(params: any): Observable<any> {
    return this.http.get(environment.url + '/odz/barangay', {headers: httpOptions.headers, params});
  }

  create(body: any): Observable<any> {
    return this.http.post(environment.url + '/odz', body, {headers: httpOptions.headers});
  }
  update(body: any): Observable<any> {
    return this.http.put(environment.url + '/odz', body, {headers: httpOptions.headers});
  }
}
