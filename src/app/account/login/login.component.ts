import { Component, OnInit } from '@angular/core';
import {activities, Activity} from '../../dashboard/dashboard-components/activity/activity-data';
import {AuthLoginInfo} from "../../auth/login-info";
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {JwtResponse} from "../../auth/jwt-response";
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo | undefined;
  public data: JwtResponse | undefined;
  activityData: Activity[];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {

    this.activityData = activities;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.data = data;
        console.log(data);
        this.tokenStorage.saveToken(this.data.accessToken);
        this.tokenStorage.saveUsername(this.data.username);
        this.tokenStorage.saveAuthorities(this.data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.roles);
        // this.reloadPage();
        this.router.navigate(['/order']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
