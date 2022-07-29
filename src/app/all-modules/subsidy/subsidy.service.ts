import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";
import {Subsidy} from "./interface/subsidy";

@Injectable({
  providedIn: 'root'
})
export class SubsidyService {
  private baseUrl = environment.apiUrl+'products/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }



  getAllSubsidies(): Observable<any>{
    return this.http.get(this.baseUrl+'listsubsidy',this.httpOptions)
  }

  addSubsidy(subsidy: Subsidy): Observable<any>{
    return this.http.post(this.baseUrl+'addsubsidy', subsidy,this.httpOptions);
  }
}
