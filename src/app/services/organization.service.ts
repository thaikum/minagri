import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {headers} from "../http/http-headers";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrl =environment.apiUrl +'organization/';
  httpOptions = {
    headers
  }

  constructor(private _http: HttpClient) {
  }

  getUserTypes(): Observable<any>{
    return this._http.get(this.baseUrl+'orgtypelist',this.httpOptions)
  }

  create(data): Observable<any>{
    return this._http.post(this.baseUrl+'createorgtype/',this.httpOptions)
  }

  getAll(): Observable<any>{
    return this._http.get(this.baseUrl+'orglist',this.httpOptions);
  }

}
