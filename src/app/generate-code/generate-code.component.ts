import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent implements OnInit {
  nameRole: any;
  myControl = new FormControl();
  code = 'Your code is here';

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.code = 'Your code is here'
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
