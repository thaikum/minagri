import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CommissionService} from "../commission.service";
import {Subject} from "rxjs";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-manage-commission',
  templateUrl: './manage-commission.component.html',
  styleUrls: ['./manage-commission.component.css']
})
export class ManageCommissionComponent implements OnInit {
  public commissions = [];
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");

  constructor(http: HttpClient, public cs: CommissionService,) { }

  ngOnInit(): void {
    this.getCommissions();
  }

  //  Endpoints
//  1. get all Sales Commissions
  public getCommissions(): void {
    this.cs.getCommissions('/products/listcommission').subscribe((data) => {
      // @ts-ignore
      this.commissions = data;
      this.dtTrigger.next();
      this.rows = this.commissions;
      this.srch = [...this.rows];
    });
  }
  // public getCommissions(): void{
  //   this.cs.getCommissions('/products/listcommission').subscribe((response:any) => {
  //     console.log(response)
  //   })
  // }

// //  2. Add
//   public onAddSubsidy(addForm: NgForm): void {
//     this.cs.addCommission('',addForm.value).subscribe(
//       (response:Commissions) => {
//         console.log(response);
//         this.getCommissions();
//       },
//       (error:HttpErrorResponse) => {
//         alert(error.message);
//       }
//     );
//
//   }
}
