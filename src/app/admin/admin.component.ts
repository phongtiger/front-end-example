import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              private userService: UserService,
              ) {

  }

  ngOnInit(): void {
    this.userService.checkToken().subscribe(
      data => {
        console.log(data)
        if (0 !== data.error_code) {
          // this.router.navigate(['/login']);
        }
      }, error => {
        console.log(error)

      }
    )
  }

}
