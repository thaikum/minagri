import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";
import {Subsidy} from "../subsidy/interface/subsidy";
import {CropCuts} from "./interface/crop-cuts";
import {Contract} from "./interface/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = environment.apiUrl+'claims/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }
//Get All Contracts
  getAllContracts(): Observable<any>{
    return this.http.get(this.baseUrl+'listcontracts',this.httpOptions)
  }
//  Add New Contract Review
  addContract(contract: Contract): Observable<any>{
    return this.http.post(this.baseUrl+'createcontract', contract,this.httpOptions);
  }

//   //Get All Contracts
//   getContracts(endpoint: string){
//     return this.http.get(this.url + endpoint);
//   }
//
// //  Add New Contract Review
//   addContract(endpoint: string, model: any){
//     return this.http.post(this.url + endpoint, model);
//   }

//Get All Cropcuts
  getAllCropcuts(): Observable<any>{
    return this.http.get(this.baseUrl+'',this.httpOptions);
  }
//  Add New Cropcuts
  addCropcut(cropcut: CropCuts): Observable<any>{
    return this.http.post(this.baseUrl+'',cropcut,this.httpOptions);
  }

// //Get All Cropcuts
//   getCropcuts(endpoint: string){
//     return this.http.get(this.url + endpoint);
//   }
//
// //  Add New Cropcuts
//   addCropcut(endpoint: string, model: any){
//     return this.http.post(this.url + endpoint, model);
//   }
}
