import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderServiceService} from '../services/order-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {LegendService} from '../services/legend.service';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {User} from '../order-marketing/order-marketing.component';
export class Legend {
  id = '';
  productDescription = '';
  len = '';
  product = '';
  colorSizeModel = '';
  code = '';
  setSale = '';
  ivnCode = '';
  freebies = '';
  specialPromos = '';

}

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  fromGroup: any;
  data: {
    jntTotalProductTemplate: string;
    timestamp: string ;
    bexCod: string; gogoCod: string; lbcCod: string; ninjaCod: string; jntCod: string; odzbyaheros: string } = {
    odzbyaheros: '',
    jntCod: '',
    ninjaCod: '',
    bexCod: '',
    gogoCod: '',
    lbcCod: '',
    timestamp: '',
    jntTotalProductTemplate: ''
  };
  filteredOptions: Observable<string[]>;
  public options: string[] = [];
  myControl = new FormControl();

  constructor(private route: ActivatedRoute,
              private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              private legendService: LegendService
              ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.findOne(params.id).subscribe(
          data => {
            console.log(data);
            if (data) {
              this.data = data.data;
              this.fromGroup.patchValue(this.data);
              this.myControl.patchValue(this.data.jntTotalProductTemplate);
            }
          }, error => {
            console.log(error);
            this.snackBar.open(error.error.message, 'Close', {
              duration: 8000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        );
      }
    });

    this.fromGroup = new FormGroup({
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
      timestamp:  new FormControl(this.data.timestamp),
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
  }

  ngOnInit(): void {
    this.legendService.findAll().subscribe(
        data => {
          this.options = [];
          for (let i = 0; i < data.length; i++) {
            this.options.push(data[i].productDescription);
          }
          console.log(this.options)
        }, error => {
        console.log(error);
        this.snackBar.open('An error has occurred. Please try again', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );
    this.filteredOptions = this.fromGroup.controls['jntTotalProductTemplate'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filter(value))
    );
  }

  private _filter(value: any): string[] {
    // if (value) {
    //   return this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    // }
    // return [];

    return !!value ? this.options.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }

  displayFn(legend?: Legend): string | undefined {
    return legend ? legend.productDescription : undefined;
  }

  save() {
    console.log(this.fromGroup.value.callReason);
    this.orderService.saveOne(this.fromGroup.value).subscribe(
      data => {
      console.log(data);
      if (data) {
        this.snackBar.open('Save success', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        this.data = data.data;
        this.fromGroup.patchValue(this.data);
      }
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    });
  }
}
