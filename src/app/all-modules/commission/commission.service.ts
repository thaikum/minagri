import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  constructor(private http: HttpClient) { }
  url = 'http://157.230.190.229:8843/v2/api-docs'

  // Product Category

  //Get All Sales Commissions
  getCommissions(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

  //  Creat New Sales Commission
  createCommission(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }
}
