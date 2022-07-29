import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";
import {Commission} from "./interface/commission";

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private baseUrl = environment.apiUrl+'claims/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }
//Get All Sales Commissions
  getAllCommissions(): Observable<any> {
    return this.http.get(this.baseUrl+'',this.httpOptions);
  }

  //  Creat New Sales Commission
  createCommission(commission:Commission): Observable<any> {
    return this.http.post(this.baseUrl+'',commission, this.httpOptions);
  }

  // // Product Category
  //
  // //Get All Sales Commissions
  // getCommissions(endpoint: string){
  //   return this.http.get(this.url + endpoint);
  // }
  //
  // //  Creat New Sales Commission
  // createCommission(endpoint: string, model: any){
  //   return this.http.post(this.url + endpoint, model);
  // }
}
