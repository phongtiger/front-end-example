import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthLoginInfo} from "../auth/login-info";
import {JwtResponse} from "../auth/jwt-response";
import {SignUpInfo} from "../auth/signup-info";
import {environment} from "../../environments/environment";
import {UserInfo} from "../account/account/user-info";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<any> {
    return this.http.get(environment.url + '/users/search', {headers: httpOptions.headers});
  }

  changePassword(u : UserInfo): Observable<any> {
    return this.http.put(environment.url + '/pass', u,{headers: httpOptions.headers});
  }
  //
  // getAdminBoard(): Observable<string> {
  //   return this.http.get(environment.url, { responseType: 'text' });
  // }
}
