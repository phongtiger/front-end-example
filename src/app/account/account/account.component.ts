import { Component, OnInit } from '@angular/core';
import {activities, Activity} from '../../dashboard/dashboard-components/activity/activity-data';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpInfo} from "../../auth/signup-info";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserInfo} from "./user-info";
import {UserService} from "../../services/user.service";

export interface User {
  id: number;
  name: string;
  email: number;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  role: string[];
  public nameRole: string | undefined;
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource: any;

  activityData: Activity[];
  accountForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl({ value: '12345678', disabled: true }),
    // passwordRepeat: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('')
  });
  errorMK = false;
  private signupInfo: SignUpInfo | undefined;
  private userInfo: UserInfo | undefined;
  accountFormOne = new FormGroup({
    password: new FormControl(''),
    newpassword: new FormControl(''),
    renewpassword: new FormControl('')
  });
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              public snackBar: MatSnackBar,
              private userService: UserService) {
    this.activityData = activities;
    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.role = this.tokenStorage.getAuthorities();
    if (this.role.includes('ROLE_ADMIN')) {
      this.nameRole = 'Admin';
    } else if (this.role.includes('ROLE_PM_MK')) {
      this.nameRole = 'Leader marketing';
    } else if (this.role.includes('ROLE_PM_SALE')) {
      this.nameRole = 'Leader sale';
    } else if (this.role.includes('ROLE_SALE')) {
      this.nameRole = 'Sale';
    } else if (this.role.includes('ROLE_MK')) {
      this.nameRole = 'Marketing';
    } else {
      this.nameRole = 'Not rule';
    }

  }


  ngOnInit(): void {
    this.errorMK = false;
    this.userService.getUserBoard().subscribe( res => {
      this.dataSource = res;
      console.log(res)
    }, error => {

    })

  }

  save(event: any): void {
    console.log(this.accountForm.value);
    if (this.accountForm.value.password !== this.accountForm.value.passwordRepeat) {
      this.errorMK = true;
      setTimeout( () => { this.errorMK = false; }, 10000 );
    }
    console.log(this.accountForm.value);
    this.signupInfo = new SignUpInfo(
      this.accountForm.value.name,
      this.accountForm.value.username,
      this.accountForm.value.email,
      '12345678',
      this.accountForm.value.role);
    console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        delete this.accountForm.value.name;
        delete this.accountForm.value.username;
        delete this.accountForm.value.email;
        this.snackBar.open('Create success', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        console.log(data);
      },
      error => {
        this.snackBar.open('An error has occurred. Please try again', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );

  }

  saveOne($event: any) {
    if (this.accountFormOne.value.password === ''
      || this.accountFormOne.value.password === null
      || this.accountFormOne.value.password === undefined) {
      this.snackBar.open('Please enter old password!', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    } else if (this.accountFormOne.value.newpassword !== this.accountFormOne.value.renewpassword) {
      this.snackBar.open('Password not match. Please try again!', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }  else {
      this.userInfo = new UserInfo(
        this.accountFormOne.value.password,
        this.accountFormOne.value.newpassword
      );
      this.userService.changePassword(this.userInfo).subscribe(
        result => {
          this.snackBar.open('Change password success', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          this.tokenStorage.signOut();
          this.router.navigate(['/login']);
        }, error => {
          this.snackBar.open('An error has occurred. Please try again', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      );
    }
  }
}
