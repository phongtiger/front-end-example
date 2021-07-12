import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderServiceService} from "../services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  fromGroup = new FormGroup({
    clevel:  new FormControl(),
    callReason:  new FormControl(),
    id:  new FormControl(),
    staff:  new FormControl(),
    customer:  new FormControl(),
    mobileNumber:  new FormControl(),
    item:  new FormControl(),
    province:  new FormControl(),
    district:  new FormControl(),
    subdistrict:  new FormControl(),
    address:  new FormControl(),
    detail:  new FormControl(),
    marketer:  new FormControl(),
    statusDelivery:  new FormControl(),
    courier:  new FormControl(),
    timestamp:  new FormControl(),
    price:  new FormControl(),
    chatPage:  new FormControl(),
    addressJnt:  new FormControl(),
    qty1:  new FormControl(),
    product1:  new FormControl(),
    qty2:  new FormControl(),
    product2:  new FormControl(),
    qty3:  new FormControl(),
    product3:  new FormControl(),
    free:  new FormControl(),
    freebieProduct:  new FormControl(),
    totalProductNames:  new FormControl(),
    jntTotalProductTemplate:  new FormControl(),
    jntProductCodeFormula:  new FormControl(),
    setSale:  new FormControl(),
    qty:  new FormControl(),
    bexProCode:  new FormControl(),
    brgyCityProvince:  new FormControl(),
    addcheck:  new FormControl(),

    odzbyaheros:  new FormControl(),
    jntCod:  new FormControl(),
    ninjaCod:  new FormControl(),
    bexCod:  new FormControl(),
    gogoCod:  new FormControl(),
    lbcCod:  new FormControl(),
    bexBrgy:  new FormControl(),
    bexPouches:  new FormControl()
  });
  data: any;

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
