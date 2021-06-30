import { Component } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['head.css']
})
export class AppHeaderComponent {
  role: string[];
  public nameRole: string | undefined;
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
    this.role = this.tokenStorage.getAuthorities();
    if (this.role.includes('ROLE_ADMIN')) {
      this.nameRole = 'Admin';
    } else if (this.role.includes('ROLE_PM_MK')) {
        this.nameRole = 'Lead marketing';
    } else if (this.role.includes('ROLE_PM_SALE')) {
      this.nameRole = 'Lead sale';
    } else if (this.role.includes('ROLE_MK')) {
      this.nameRole = 'Marketing';
    } else if (this.role.includes('ROLE_SALE')) {
      this.nameRole = 'Sale';
    }
  }
  logout() {
    this.tokenStorage.signOut();
  }
}
