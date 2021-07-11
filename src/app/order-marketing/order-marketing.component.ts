import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {OrderServiceService} from "../services/order-service.service";
import {map, startWith, tap} from "rxjs/operators";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";


class Legend {
  id = '';
  createDate = '';
  clevel = '';
  note = '';
  assigned = '';
  name = '';
  phone = '';
  address = '';
  province = '';
  district = '';
  barangay = '';
  produce = '';
  detail = '';
  marketer = '';
}

export interface User {
  name: string;
  username: string;
  id: string;
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-order-marketing',
  templateUrl: './order-marketing.component.html',
  styleUrls: ['./order-marketing.component.css'],
})
export class OrderMarketingComponent implements OnInit, AfterViewInit {
  page = 0;
  displayedColumns: string[] = ['createDate', 'clevel', 'note', 'assigned', 'name', 'phone', 'address', 'province', 'district', 'barangay', 'produce', 'detail', 'marketer'];
  dataSource = new MatTableDataSource<Legend>();
  content: any;
  role: string[];
  public nameRole: string | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 0;
  pageSize = 5;
  filteredOptions: Observable<User[]>;
  private options: User[];
  myControl = new FormControl();
  private lstOrderId: string[] = [];
  private dataRoot: Legend[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  searchForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    note: new FormControl(),
    cLevel: new FormControl()
  });
  loading = false;
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService,
              private _formBuilder: FormBuilder,
              private datePipe : DatePipe) {
    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.role = this.tokenStorage.getAuthorities();
    if (this.role.includes('ROLE_ADMIN')) {
      this.nameRole = 'admin';
    } else if (this.role.includes('ROLE_PM_MK')) {
      this.nameRole = 'pmmarketing';
    } else if (this.role.includes('ROLE_PM_SALE')) {
      this.nameRole = 'pmsale';
    } else if (this.role.includes('ROLE_MK')) {
      this.nameRole = 'marketing';
    } else if (this.role.includes('ROLE_SALE')) {
      this.nameRole = 'sale';
    }
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }


  ngOnInit(): void {
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.initData(params);
    this.userService.getUserBoard().subscribe( res => {
      this.options = res;
      console.log(res)
    }, error => {

    });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options)
      );

  }

  private loadLessonsPage() {
    const fromDa = this.datePipe.transform(this.searchForm.value.fromDate, 'dd-MM-yyyy');
    const toDa =this.datePipe.transform(this.searchForm.value.toDate, 'dd-MM-yyyy');
    const params = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      note: this.searchForm.value.note,
      cLevel: this.searchForm.value.cLevel,
      fromDate: fromDa,
      toDate: toDa
    };
    this.initData(params);
  }

  addSaleFunction() {
    this.lstOrderId = [];
    for (let i = 0; i < this.dataRoot.length; i++) {
      this.lstOrderId.push(this.dataRoot[i].id);
    }
    const body = {
      sales : this.myControl.value.name,
      lstOrderId : this.lstOrderId
    };
    this.loading = true;
    this.orderService.addSale(body).subscribe(
      data => {
        this.loading = false;
          this.snackBar.open('Add sale success!', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });

      }, error => {
        this.snackBar.open(error.error.message, 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );

  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  initData(params: any) {
    this.loading = true;
    this.orderService.getOrderByMarketing(params).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        if (data != null && data.data != null && data.data.totalElements != null) {
          this.length = data.data.totalElements;
          this.dataRoot = data.data.content;
          this.dataSource = new MatTableDataSource<Legend>(data.data.content);
        } else {
          this.dataSource = new MatTableDataSource<Legend>();
          this.snackBar.open('Success! But not found data in system CMS', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        }
      }, error => {
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
      note: this.searchForm.value.note,
      cLevel: this.searchForm.value.cLevel,
      fromDate: fromDa,
      toDate: toDa
    };
    this.initData(params);
  }
}
