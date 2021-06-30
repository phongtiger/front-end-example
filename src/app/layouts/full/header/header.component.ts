import { Component } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
  }
  logout() {
    this.tokenStorage.signOut();
  }
}
