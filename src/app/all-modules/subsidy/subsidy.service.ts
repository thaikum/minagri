import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SubsidyService {

  constructor(private http: HttpClient) { }
  url = 'http://157.230.190.229:8843'

  //Get All Subsidies
  getSubsidy(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

//  Add New Subsidy
  addSubsidy(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }
}
