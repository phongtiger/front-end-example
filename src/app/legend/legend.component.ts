import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {activities, Activity} from "../dashboard/dashboard-components/activity/activity-data";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs/operators";
import {LegendService} from "../services/legend.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

class PeriodicElement {
  id: '';
  productDescription : '';
  len: '';
  product: '';
  colorSizeModel: '';
  code: '';
  setSale: '';
  ivnCode: '';
  freebies: '';
  specialPromos: '';
}

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit, AfterViewInit {
  page = 0;
  displayedColumns: string[] = ['id', 'productDescription', 'len', 'product', 'colorSizeModel', 'code', 'setSale', 'ivnCode', 'freebies', 'specialPromos'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  content: any;
  role: string[];
  public nameRole: string | undefined;
  activityData: Activity[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:typedef
  length = 0;
  pageSize = 2;
  legendForm = new FormGroup({
    productDescription: new FormControl(''),
    len: new FormControl(''),
    product: new FormControl(''),
    colorSizeModel: new FormControl(''),
    code: new FormControl(''),
    setSale: new FormControl(''),
    ivnCode: new FormControl(''),
    freebies: new FormControl(''),
    specialPromos: new FormControl('')
  });
  openedCreate = false;
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private legendService: LegendService,
              public snackBar: MatSnackBar,
              private router: Router
              ) {
    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.activityData = activities;
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
    this.legendService.findAllByPage(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.totalElements != null) {
          this.length = data.totalElements;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data.content);
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
  changePage($event: any) {

  }

  private loadLessonsPage() {
    const params = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize
    };
    this.legendService.findAllByPage(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.totalElements != null) {
          this.length = data.totalElements;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data.content);
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

  save($event: MouseEvent) {
    this.legendService.create(this.legendForm.value).subscribe(
      data => {
        this.snackBar.open('Success create legend', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      }, error => {
        this.snackBar.open(error.error.message, 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    )
  }

  openCreate() {
    this.openedCreate = true
  }

  closeTab($event: MouseEvent) {
    this.openedCreate = false
    const params = {
      page: this.page,
      size: this.pageSize
    };
    this.legendService.findAllByPage(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.totalElements != null) {
          this.length = data.totalElements;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data.content);
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
