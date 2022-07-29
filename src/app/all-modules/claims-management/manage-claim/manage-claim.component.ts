import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClaimsService} from "../claims.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import {FormGroup} from "@angular/forms";
<<<<<<< HEAD
import {Claims} from "../interface/claims";
=======
>>>>>>> da4fadc4a53df406c35a324f8b349e2a3334ec6d

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
<<<<<<< HEAD
  public Claims: Claims[] = [];
=======
  public claims = [];
>>>>>>> da4fadc4a53df406c35a324f8b349e2a3334ec6d
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
    this.Claims = [];
    this.getClaims();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }


  //  Endpoints
//  1. get all Claims
<<<<<<< HEAD
  public getClaims() {
    this.cs.getAllClaims().subscribe((data) =>{
      this.Claims = data;
      this.rows = this.Claims;
      this.srch = [...this.rows];
    })
=======
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
>>>>>>> da4fadc4a53df406c35a324f8b349e2a3334ec6d
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
