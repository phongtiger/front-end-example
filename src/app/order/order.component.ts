import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {activities, Activity} from '../dashboard/dashboard-components/activity/activity-data';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

export interface PeriodicElement {
  category: string;
  item: string;
  orderId: string;
  name: string;
  phone: string;
  address: string;
  detail: string;
  createDate: string;
  username: string;
  deliveryStatus: string;
  payment: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1},
  {category: 'Điện tử', item: 'May chụp hình', orderId: '123456', name: 'Nguyen Văn A', phone: '123134324213', address: '1 Ba Trieu', detail: '1 Chiếc loại A', createDate: '00:33:22 12/06/2021', username: 'phongtv', deliveryStatus: 'Đat tiếp nhận', payment: 111111.1}
];

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements AfterViewInit {

  displayedColumns: string[] = ['orderId', 'category', 'item',  'name', 'phone', 'address', 'detail', 'createDate', 'username', 'deliveryStatus', 'payment'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  role: string[];
  public nameRole: string | undefined;
  activityData: Activity[];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
  constructor(private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router) {
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

}
