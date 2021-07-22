import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrderServiceService} from "../services/order-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-order-sale',
  templateUrl: './order-sale.component.html',
  styleUrls: ['./order-sale.component.css']
})
export class OrderSaleComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'clevel',
    'callReason',
    'id',
    'staff',
    'timestamp',
    'customer',
    'mobileNumber',
    'item',
    'province',
    'district',
    'barangay',
    'address',
    'detail',
    'marketer',
    'price',
    'chatPage',
    'addressJnt',
    'provinceJnt',
    'districtJnt',
    'barangayJnt',
    'qty1',
    'product1',
    'qty2',
    'product2',
    'qty3',
    'product3',
    'free',
    'freebieProduct',
    'specialPromos',
    'totalProductNames',
    'jntTotalProductTemplate',
    'jntProductCodeFormula',
    'setSale',
    'qty',
    'bexProCode',
    'brgyCityProvince',
    'addcheck',

    'jntCod',
    'ninjaCod',
    'bexCod',
    'gogoCod',
    'lbcCod',

    'statusDelivery',
    'courier',
    'updon',

    'bexBrgy',
    'bexPouches'
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  private page = 0;
  public pageSize = 50;
  public length = 0;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  role: string[];
  nameRole: any;
  searchForm= new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    name: new FormControl(),
    phoneNumber: new FormControl(),
    cLevel: new FormControl()
  });
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  clevel: any = {};
  callReason: any = {};
  customer: any = {};

  constructor(private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              private datePipe : DatePipe,
              private userService: UserService) {

    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.role = this.tokenStorage.getAuthorities();
    if (this.role.includes('ROLE_ADMIN')) {
      this.nameRole = 'admin';
    } else if (this.role.includes('ROLE_PM_MK')) {
      this.snackBar.open('You not have permission', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigate(['/marketing']);
    } else if (this.role.includes('ROLE_PM_SALE')) {
      this.nameRole = 'pmsale';
    } else if (this.role.includes('ROLE_MK')) {
      this.snackBar.open('You not have permission', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigate(['/marketing']);
    } else if (this.role.includes('ROLE_SALE')) {
      this.nameRole = 'sale';
    }
  }

  ngOnInit(): void {
    this.userService.checkToken().subscribe(
      (data) => {
        if (0 !== data.error_code) {
          this.snackBar.open('Token hết hạn!', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          // this.router.navigate(['/login']);
        }
      }
    )
    this.loading = true;
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.initData(params);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  private loadLessonsPage() {
    const params = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize
    };
    this.initData(params);
  }

  private initData(params: any) {
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

  search() {
    console.log(this.searchForm.value)
    const fromDa = this.datePipe.transform(this.searchForm.value.fromDate, 'dd-MM-yyyy');
    const toDa =this.datePipe.transform(this.searchForm.value.toDate, 'dd-MM-yyyy');
    console.log(fromDa)
    console.log(toDa)
    const params = {
      page: this.page,
      size: this.pageSize,
      name: this.searchForm.value.name,
      phoneNumber: this.searchForm.value.phoneNumber,
      cLevel: this.searchForm.value.cLevel,
      fromDate: fromDa,
      toDate: toDa
    };
    this.initData(params);
  }

  saveOne(id: number) {
  }

  editOrder(id : number) {
    this.router.navigate(['/editorder/' + id ])
  }
}

export interface Element {
  id: string;
  clevel: string;
  callReason: string;
  staff: string;
  customer: string;
  mobileNumber: string;
  item: string;
  province: string;
  district: string;
  barangay: string;
  address: string;
  detail: string;
  marketer: string;

  statusDelivery: string;
  courier: string;
  updon: string;

  timestamp: string;
  price: string;
  chatPage: string;
  addressJnt: string;
  provinceJnt: string;
  districtJnt: string;
  barangayJnt: string;
  qty1: string;
  product1: string;
  qty2: string;
  product2: string;
  qty3: string;
  product3: string;
  free: string;
  freebieProduct: string;
  specialPromos: string;
  totalProductNames: string;
  jntTotalProductTemplate: string;
  jntProductCodeFormula: string;
  setSale: string;
  qty: string;
  bexProCode: string;
  brgyCityProvince: string;
  addcheck: string;

  // odzbyaheros: string;
  jntCod: string;
  ninjaCod: string;
  bexCod: string;
  gogoCod: string;
  lbcCod: string;

  bexBrgy: string;
  bexPouches: string;
}

const ELEMENT_DATA: Element[] = [
];
