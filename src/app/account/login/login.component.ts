import { Component, OnInit } from '@angular/core';
import {activities, Activity} from '../../dashboard/dashboard-components/activity/activity-data';
import {AuthLoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {JwtResponse} from "../../auth/jwt-response";
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;
  public data: JwtResponse | undefined;
  activityData: Activity[];
  accountFormOne = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              public snackBar: MatSnackBar) {

    this.activityData = activities;
  }

  ngOnInit(): void {
    this.roles = this.tokenStorage.getAuthorities();
    if (this.roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin']);
    } else if (this.roles.includes('ROLE_PM_MK')) {
      this.router.navigate(['/marketing']);
    } else if (this.roles.includes('ROLE_PM_SALE')) {
      this.router.navigate(['/sale']);
    } else if (this.roles.includes('ROLE_MK')) {
      this.router.navigate(['/marketing']);
    } else if (this.roles.includes('ROLE_SALE')) {
      this.router.navigate(['/sale']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit($event: Event) {
    this.loginInfo = new AuthLoginInfo(
      this.accountFormOne.value.username,
      this.accountFormOne.value.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.data = data;
        this.tokenStorage.saveToken(this.data.accessToken);
        this.tokenStorage.saveName(this.data.username);
        this.tokenStorage.saveUsername(this.data.name);
        this.tokenStorage.saveAuthorities(this.data.authorities);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.snackBar.open('Login success!', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.roles = this.tokenStorage.getAuthorities();
        if (this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/dashboard']);
        } else if (this.roles.includes('ROLE_PM_MK')) {
          this.router.navigate(['/marketing']);
        } else if (this.roles.includes('ROLE_PM_SALE')) {
          this.router.navigate(['/sale']);
        } else if (this.roles.includes('ROLE_MK')) {
          this.router.navigate(['/marketing']);
        } else if (this.roles.includes('ROLE_SALE')) {
          this.router.navigate(['/sale']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.snackBar.open(error.error.message, 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );
  }

}
