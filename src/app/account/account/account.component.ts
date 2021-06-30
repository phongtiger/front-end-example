import { Component, OnInit } from '@angular/core';
import {activities, Activity} from '../../dashboard/dashboard-components/activity/activity-data';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  role: string[];
  public nameRole: string | undefined;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  dataSource = ELEMENT_DATA;

  activityData: Activity[];

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
    } else {
      this.nameRole = '1';
    }
  }


  ngOnInit(): void {
  }

}
