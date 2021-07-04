import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['head.css']
})
export class AppHeaderComponent implements OnInit {
  roles: string[];
  public nameRole: string | undefined;
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
    this.roles = this.tokenStorage.getAuthorities();
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}
