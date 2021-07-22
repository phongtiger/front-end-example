import { Component, OnInit } from '@angular/core';
import {OrderServiceService} from "../services/order-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private orderService: OrderServiceService,
              private datePipe : DatePipe) { }

  ngOnInit(): void {
  }

  getExel() {
    this.orderService.getExcel().subscribe(
      data => this.downloadFile(data)
    )
  }

  downloadFile(data: any){
    var url = window.URL.createObjectURL(new Blob([data]));

    // Debe haber una manera mejor de hacer esto...
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    const fromDa = this.datePipe.transform(new Date, 'dd_MM_yyyy');
    a.download = 'updonjnt_'+ fromDa + '.xls';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove(); // remove the element
  }
}
