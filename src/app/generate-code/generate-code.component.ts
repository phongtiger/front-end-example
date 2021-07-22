import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent implements OnInit {
  nameRole: any;
  myControl = new FormControl();
  code = 'Your code is here';
  role: any;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              public snackBar: MatSnackBar,
              private authService: AuthService,
              private userService: UserService,
              ) {
    if (this.tokenStorage.getToken() == null) {
      this.router.navigate(['/login']);
    }
    this.role = this.tokenStorage.getAuthorities();
    if (this.role.includes('ROLE_ADMIN')) {
      this.nameRole = 'admin';
    } else if (this.role.includes('ROLE_PM_MK')) {
      this.nameRole = 'pmmarketing';
    } else if (this.role.includes('ROLE_PM_SALE')) {
      this.snackBar.open('You not have permission', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigate(['/sale']);
    } else if (this.role.includes('ROLE_MK')) {
      this.nameRole = 'marketing';
    } else if (this.role.includes('ROLE_SALE')) {
      this.snackBar.open('You not have permission', 'Close', {
        duration: 8000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigate(['/sale']);
    }

  }

  ngOnInit(): void {
    this.code = 'Your code is here'

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
  }

  generateCode() {
    this.code = "<script>\n" +
      "      function createOrderData() {\n" +
      "            let body = {\n" +
      "                  name: '',\n" +
      "                  address: '',\n" +
      "                  phone: '',\n" +
      "                  province: '',\n" +
      "                  district: '',\n" +
      "                  subdistrict: '',\n" +
      "                  detail: '',\n" +
      "                  produce: ' " + this.myControl.value + "',\n" +
      "                  maketer: \""+ this.tokenStorage.getName() +"\"\n" +
      "            };\n" +
      "            $('form').serializeArray().forEach(input => {\n" +
      "                  if (input) {\n" +
      "                        switch (input.name) {\n" +
      "                              case 'name':\n" +
      "                                    body.name = input.value;\n" +
      "                                    break;\n" +
      "                              case 'Province':\n" +
      "                                    body.province = input.value;\n" +
      "                                    break;\n" +
      "                              case 'District':\n" +
      "                                    body.district = input.value;\n" +
      "                                    break;\n" +
      "                              case 'SubDistrict':\n" +
      "                                    body.subdistrict = input.value;\n" +
      "                                    break;\n" +
      "                              case 'address':\n" +
      "                                    body.address = input.value;\n" +
      "                                    break;\n" +
      "                              case 'phone':\n" +
      "                                    body.phone = input.value;\n" +
      "                                    break;\n" +
      "                              default:\n" +
      "                                    body.detail += input.value ? input.value + ',' : '';\n" +
      "                                    break\n" +
      "                        }\n" +
      "                  }\n" +
      "            });\n" +
      "            var settings = {\n" +
      "                  \"url\": \"https://happybuying.site/api/orders\",\n" +
      "                  \"method\": \"POST\",\n" +
      "                  \"timeout\": 0,\n" +
      "                  \"headers\": {\n" +
      "                        \"Content-Type\": \"application/json\"\n" +
      "                  },\n" +
      "                  \"data\": JSON.stringify(body),\n" +
      "            };\n" +
      "            console.log(body)\n" +
      "            $.ajax(settings).done(function (response) {\n" +
      "                  console.log(response);\n" +
      "            });\n" +
      "      }\n" +
      "      $(document).ready(function () {\n" +
      "            $(\"button:submit\").click(function () {\n" +
      "                  createOrderData()\n" +
      "            });\n" +
      "      });\n" +
      "\n" +
      "</script>"
  }
}
