import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CommissionService} from "../commission.service";
import {Subject} from "rxjs";
import {DatePipe} from "@angular/common";
import {Commission} from "../interface/commission";
import {DataTableDirective} from "angular-datatables";


@Component({
  selector: 'app-manage-commission',
  templateUrl: './manage-commission.component.html',
  styleUrls: ['./manage-commission.component.css']
})
export class ManageCommissionComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public commissions: Commission[] = [];
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  constructor(http: HttpClient, public cs: CommissionService,) { }

  ngOnInit(): void {
    this.getCommissions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table
  rerender(): void {
    $('#datatable').DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.commissions = [];
    this.getCommissions();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //  Endpoints
//  1. get all Sales Commissions
  public getCommissions(): void {
    this.cs.getAllCommissions().subscribe((data) => {
      this.commissions = data;
      this.rows = this.commissions;
      this.srch = [...this.rows];
    });
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.productName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
