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
import {OdzService} from "../services/odz.service";
import {UserService} from "../services/user.service";
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
    timestamp: string;
    updon: string;
    bexCod: string;
    gogoCod: string;
    lbcCod: string;
    ninjaCod: string;
    jntCod: string;
    odzbyaheros: string
  } = {
    odzbyaheros: '',
    jntCod: '',
    ninjaCod: '',
    bexCod: '',
    gogoCod: '',
    lbcCod: '',
    timestamp: '',
    updon: ''
  };
  filteredOptions1: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  filteredOptions3: Observable<string[]>;
  filteredOptionsFree: Observable<string[]>;
  filteredOptionsSpec: Observable<string[]>;
  filteredOptionsProvinceJNT: Observable<string[]>;
  filteredOptionsCityJNT: Observable<string[]>;
  filteredOptionsBarangayJNT: Observable<string[]>;
  public options1: string[] = [];
  public options2: string[] = [];
  public options3: string[] = [];
  public optionsFree: string[] = [];
  public optionsSpec: string[] = [];
  public optionsProvinceJNT: string[] = [];
  public optionsCityJNT: string[] = [];
  public optionsBarangayJNT: string[] = [];

  constructor(private route: ActivatedRoute,
              private orderService: OrderServiceService,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              public tokenStorage: TokenStorageService,
              private router: Router,
              private legendService: LegendService,
              private odzService: OdzService,
              private userService: UserService,
              ) {


    this.route.params.subscribe(params => {
      if (params.id) {
        this.orderService.findOne(params.id).subscribe(
          data => {
            console.log(data);
            if (data) {
              this.data = data.data;
              this.fromGroup.patchValue(this.data);
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
      barangay:  new FormControl(),
      address:  new FormControl(),

      detail:  new FormControl(),
      marketer:  new FormControl(),
      statusDelivery:  new FormControl(),
      courier:  new FormControl(),
      updon: new FormControl(),
      timestamp:  new FormControl(this.data.timestamp),
      price:  new FormControl(),
      chatPage:  new FormControl(),

      provinceJnt:  new FormControl(),
      districtJnt:  new FormControl(),
      barangayJnt:  new FormControl(),
      detailAddressJnt:  new FormControl(),
      addressJnt:  new FormControl(),
      qty1:  new FormControl(),
      product1:  new FormControl(),
      qty2:  new FormControl(),
      product2:  new FormControl(),
      qty3:  new FormControl(),
      product3:  new FormControl(),
      free:  new FormControl(),
      freebieProduct:  new FormControl(),
      specialPromos: new FormControl(),
      totalProductNames:  new FormControl(),
      jntTotalProductTemplate:  new FormControl(),
      jntProductCodeFormula:  new FormControl(),
      setSale:  new FormControl(),
      qty:  new FormControl(),
      bexProCode:  new FormControl(),
      brgyCityProvince:  new FormControl(),

      // odzbyaheros:  new FormControl(),
      jntCod:  new FormControl(),
      ninjaCod:  new FormControl(),
      bexCod:  new FormControl(),
      gogoCod:  new FormControl(),
      lbcCod:  new FormControl(),
      bexBrgy:  new FormControl(),
      bexPouches:  new FormControl()
    });

    this.odzService.findAllProvince().subscribe(
      data => {
        console.log(data);
        if (data) {
          this.optionsProvinceJNT = data.data;
        }
      }, error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      });


  }

  ngOnInit(): void {
    this.userService.checkToken().subscribe(
      data => {
        if (0 !== data.error_code) {
          this.snackBar.open('Token hết hạn!', 'Close', {
            duration: 8000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
          // this.router.navigate(['/login']);
        }
      }
    )

    this.legendService.findAll().subscribe(
        data => {
          console.log(data)
          this.optionsSpec = [];
          this.optionsFree = [];
          this.options1 = [];
          this.options2 = [];
          this.options3 = [];
          for (let i = 0; i < data.length; i++) {
            this.optionsFree.push(data[i].freebies);
            this.options1.push(data[i].productDescription);
            this.options2.push(data[i].productDescription);
            this.options3.push(data[i].productDescription);
            this.optionsSpec.push(data[i].specialPromos);
          }
          console.log(this.optionsFree)
        }, error => {
        console.log(error);
        this.snackBar.open('An error has occurred. Please try again', 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );

    this.filteredOptions1 = this.fromGroup.controls['product1'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filter1(value))
    );
    this.filteredOptions2 = this.fromGroup.controls['product2'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filter2(value))
    );
    this.filteredOptions3 = this.fromGroup.controls['product3'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filter3(value))
    );
    this.filteredOptionsFree = this.fromGroup.controls['freebieProduct'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filterFree(value))
    );
    this.filteredOptionsSpec = this.fromGroup.controls['specialPromos'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filterSpec(value))
    );
    this.filteredOptionsProvinceJNT = this.fromGroup.controls['provinceJnt'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filterSpecProvinceJNT(value))
    );
    this.filteredOptionsCityJNT = this.fromGroup.controls['districtJnt'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filterSpecCityJNT(value))
    );
    this.filteredOptionsBarangayJNT = this.fromGroup.controls['barangayJnt'].valueChanges.pipe(
        debounceTime(300),
        startWith(''),
        map((value : any) => this._filterSpecBarangayJNT(value))
    );
  }

  private _filter1(value: any): string[] {
    return !!value ? this.options1.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }
  private _filter2(value: any): string[] {
    return !!value ? this.options2.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }
  private _filter3(value: any): string[] {
    return !!value ? this.options3.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }
  private _filterFree(value: any): string[] {
    return !!value ? this.optionsFree.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }
  private _filterSpec(value: any): string[] {
    return !!value ? this.optionsSpec.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];

  }
  private _filterSpecProvinceJNT(value: any): string[] {
    return !!value ? this.optionsProvinceJNT.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];
  }
  private _filterSpecCityJNT(value: any): string[] {
    return !!value ? this.optionsCityJNT.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];
  }
  private _filterSpecBarangayJNT(value: any): string[] {
    return !!value ? this.optionsBarangayJNT.filter(option => option.toLowerCase().includes(value.toLowerCase())) : [];
  }

  // displayFn(legend?: Legend): string | undefined {
  //   return legend ? legend.productDescription : undefined;
  // }

  save() {
    console.log(this.fromGroup.value);
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

  onSelectDistrict(value: any) {
    console.log(value)
    this.fromGroup.controls['districtJnt'].patchValue("");
    const params = {
      province: value
    }
    this.odzService.findAllCityByProvince(params).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.optionsCityJNT = data.data;
        }
      }, error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Close', {
          duration: 8000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      });
  }
  onSelectCity(value: any) {
    console.log(value)
    this.fromGroup.controls['barangayJnt'].patchValue("");
    const params = {
      city: value
    }
    this.odzService.findAllBarangayByCity(params).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.optionsBarangayJNT = data.data;
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
