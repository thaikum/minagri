import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SubsidyService} from "../../subsidy/subsidy.service";
import {NgForm} from "@angular/forms";
import {CommissionService} from "../commission.service";

interface Commissions {
}

@Component({
  selector: 'app-manage-commission',
  templateUrl: './manage-commission.component.html',
  styleUrls: ['./manage-commission.component.css']
})
export class ManageCommissionComponent implements OnInit {

  constructor(http: HttpClient, public cs: CommissionService,) { }

  ngOnInit(): void {
    this.getCommissions();
  }

  //  Endpoints
//  1. get all Sales Commissions
  public getCommissions(): void{
    this.cs.getCommissions('/products/listcommission').subscribe((response:any) => {
      console.log(response)
    })
  }

//  2. Add susbsidy
  public onAddSubsidy(addForm: NgForm): void {
    this.cs.addCommission('',addForm.value).subscribe(
      (response:Commissions) => {
        console.log(response);
        this.getCommissions();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }
}
