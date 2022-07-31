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
  private baseUrl = environment.apiUrl+'products/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }
//Get All Sales Commissions
  getAllCommissions(): Observable<any> {
    return this.http.get(this.baseUrl+'listcommission',this.httpOptions);
  }

  //  Creat New Sales Commission
  createCommission(commission:Commission): Observable<any> {
    return this.http.post(this.baseUrl+'',commission, this.httpOptions);
  }

}
