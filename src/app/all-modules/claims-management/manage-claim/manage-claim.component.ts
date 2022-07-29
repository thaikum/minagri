import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClaimsService} from "../claims.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {FormGroup} from "@angular/forms";

declare const $: any;
@Component({
  selector: 'app-manage-claim',
  templateUrl: './manage-claim.component.html',
  styleUrls: ['./manage-claim.component.css']
})
export class ManageClaimComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public claims = [];
  public addContractForm: FormGroup;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  constructor(http: HttpClient, public cs: ClaimsService,) { }

  ngOnInit(): void {
    this.getClaims();
  }


  //  Endpoints
//  1. get all Claims
  public getClaims(): void {
    this.cs.getClaims('').subscribe((data) => {
      // @ts-ignore
      this.claims = data;
      this.dtTrigger.next();
      this.rows = this.claims;
      this.srch = [...this.rows];
    });
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
