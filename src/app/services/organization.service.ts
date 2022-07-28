import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrl =environment.apiUrl +'organization/';
  constructor(private _http: HttpClient) {
  }

  getUserTypes(): Observable<any>{
    return this._http.get(this.baseUrl+'orgtypelist')
  }

  create(data): Observable<any>{
    return this._http.post(this.baseUrl+'createorgtype/',data)
  }

  getAll(): Observable<any>{
    return this._http.get(this.baseUrl+'orglist');
  }

}
