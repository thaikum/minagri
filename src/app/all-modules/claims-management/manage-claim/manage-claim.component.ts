import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubsidyService} from "../../subsidy/subsidy.service";
import {ClaimsService} from "../claims.service";

@Component({
  selector: 'app-manage-claim',
  templateUrl: './manage-claim.component.html',
  styleUrls: ['./manage-claim.component.css']
})
export class ManageClaimComponent implements OnInit {

  constructor(http: HttpClient, public cs: ClaimsService,) { }

  ngOnInit(): void {
    this.getClaims();
  }


  //  Endpoints
//  1. get all Subsidies
  public getClaims(): void{
    this.cs.getClaims('').subscribe((response:any) => {
      console.log(response)
    })
  }

}
