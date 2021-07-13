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
export class LegendService {

  constructor(private http: HttpClient) { }

  findAllByPage(params: any): Observable<any> {
    return this.http.get(environment.url + '/legend', {headers: httpOptions.headers, params});
  }
  findAll(): Observable<any> {
    return this.http.get(environment.url + '/legend/all', {headers: httpOptions.headers});
  }

  create(body: any): Observable<any> {
    return this.http.post(environment.url + '/legend', body, {headers: httpOptions.headers});
  }
  update(body: any): Observable<any> {
    return this.http.put(environment.url + '/legend', body, {headers: httpOptions.headers});
  }
}
