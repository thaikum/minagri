import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private http: HttpClient) { }
  url = 'http://157.230.190.229:8843'

  //Get All Contracts
  getContracts(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

//  Add New Contract Review
  addContract(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }

//Get All Cropcuts
  getCropcuts(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

//  Add New Cropcuts
  addCropcut(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }
}
