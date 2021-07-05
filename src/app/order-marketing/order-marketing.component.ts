import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {activities, Activity} from "../dashboard/dashboard-components/activity/activity-data";
import {MatPaginator} from "@angular/material/paginator";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {PeriodicElement} from "../order/order.component";
import {OrderServiceService} from "../services/order-service.service";
import {tap} from "rxjs/operators";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-marketing',
  templateUrl: './order-marketing.component.html',
  styleUrls: ['./order-marketing.component.css']
})
export class OrderMarketingComponent implements OnInit, AfterViewInit {
  page = 1;
  displayedColumns: string[] = ['createDate', 'status', 'note', 'assigned', 'name', 'phone', 'address', 'province', 'district', 'barangay', 'produce', 'detail', 'marketer'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  content: any;
  role: string[];
  public nameRole: string | undefined;
  activityData: Activity[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // tslint:disable-next-line:typedef
  private isLoginFailed: boolean | undefined;
  private isLoggedIn: boolean | undefined;
  length = 0;
  pageSize = 2;

  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private orderService: OrderServiceService,
              public snackBar: MatSnackBar) {
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
    this.orderService.getOrderByMarketing(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.totalElements != null) {
          this.length = data.data.totalElements;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data.data.content);
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
    this.orderService.getOrderByMarketing(params).subscribe(
      data => {
        console.log(data);
        if (data != null && data.totalElements != null) {
          this.length = data.data.totalElements;
          this.dataSource = new MatTableDataSource<PeriodicElement>(data.data.content);
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