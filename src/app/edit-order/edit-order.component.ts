import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderServiceService} from "../services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  options: any;

  constructor(private route: ActivatedRoute,
              private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              ) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderService.findOne(params['id']).subscribe(
          data => {
            console.log(data);
            if (data) {

            }
          }, error => {
            console.log(error);
            this.snackBar.open('An error has occurred. Please try again', 'Close', {
              duration: 8000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        );
      }
    });
  }

  ngOnInit(): void {

  }

}
