import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {
  private baseUrl = environment.apiUrl+'claims/'

  httpOptions = {
    headers: headers
  }
  constructor(private http: HttpClient) { }

  //Get All Claims
  getAllClaims(): Observable<any>{
    return this.http.get(this.baseUrl+'listcontracts',this.httpOptions)
  }
}
