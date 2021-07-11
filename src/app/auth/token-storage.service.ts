import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const NAME_KEY = 'Authname';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  public roleRoot = '';
  constructor() { }

  signOut() {
    window.localStorage.clear();
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY) as string;
  }

  // tslint:disable-next-line:typedef
  public saveUsername(username: string) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, username);
  }
  // tslint:disable-next-line:typedef
  public saveName(name: string) {
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, name);
  }

  public getUsername(): string {
    return localStorage.getItem(USERNAME_KEY) as string;
  }
  public getName(): string {
    return localStorage.getItem(NAME_KEY) as string;
  }

  // tslint:disable-next-line:typedef
  public saveAuthorities(authorities: string[]) {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(TOKEN_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY) as string).forEach((authority: { authority: string; }) => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
