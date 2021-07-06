import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrderServiceService} from "../services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-sale',
  templateUrl: './order-sale.component.html',
  styleUrls: ['./order-sale.component.css']
})
export class OrderSaleComponent implements OnInit {
  displayedColumns = [
    'cLevel',
    'callReason',
    'id',
    'staff',
    'customer',
    'mobileNumber',
    'item',
    'province',
    'district',
    'subdistrict',
    'address',
    'detail',
    'marketer',
    'statusDelivery',
    'courier',
    'timestamp',
    'status',
    'price',
    'chatPage',
    'qty1',
    'product1',
    'qty2',
    'product2',
    'qty3',
    'product3',
    'free',
    'freebieProduct',
    'totalProductNames',
    'jntTotalProductTemplate',
    'jntProductCodeFormula',
    'setSale',
    'qty',
    'bexProCode',
    'brgyCityProvince',
    'addcheck',
    'odzjnt',
    'odzninja',
    'odzbyaheros',
    'odzgogo',
    'odzlbc',
    'datenum',
    'jt',
    'ninja',
    'byaheros',
    'ax',
    'ay',
    'courierAZ',
    'bexProvince',
    'bexCity',
    'bexBrgy',
    'bexPouches',];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private page = 0;
  private pageSize = 50;
  private length = 0;
  loading = false;
  role: string[];
  constructor(private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.orderService.getOrderBySale(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.data.totalElements != null) {
          this.length = data.data.totalElements;
          this.dataSource = new MatTableDataSource<Element>(data.data.content);
          this.loading = false;
        } else {
          this.snackBar.open('Success! But not found data in system CMS', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
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

}

export interface Element {
  id: string;
  cLevel: string;
  callReason: string;
  staff: string;
  customer: string;
  mobileNumber: string;
  item: string;
  province: string;
  district: string;
  subdistrict: string;
  address: string;
  detail: string;
  marketer: string;
  statusDelivery: string;
  courier: string;
  timestamp: string;
  status: string;
  price: string;
  chatPage: string;
  qty1: string;
  product1: string;
  qty2: string;
  product2: string;
  qty3: string;
  product3: string;
  free: string;
  freebieProduct: string;
  totalProductNames: string;
  jntTotalProductTemplate: string;
  jntProductCodeFormula: string;
  setSale: string;
  qty: string;
  bexProCode: string;
  brgyCityProvince: string;
  addcheck: string;
  odzjnt: string;
  odzninja: string;
  odzbyaheros: string;
  odzgogo: string;
  odzlbc: string;
  datenum: string;
  jt: string;
  ninja: string;
  byaheros: string;
  ax: string;
  ay: string;
  courierAZ: string;
  bexProvince: string;
  bexCity: string;
  bexBrgy: string;
  bexPouches: string;
}

const ELEMENT_DATA: Element[] = [
];
