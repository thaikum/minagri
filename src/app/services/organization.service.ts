import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {headers} from '../http/http-headers';
import {Response} from '../interface/Response';
import {Organization} from '../interface/Organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrl = environment.apiUrl + 'organization/';
  httpOptions = {
    headers
  }

  constructor(private _http: HttpClient) {
  }

  // ================================= Organization main =============================

  getAll(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + 'orglist', this.httpOptions);
  }

  create(data): Observable<any> {
    return this._http.post(this.baseUrl + 'createorg', data, this.httpOptions);
  }

  edit(data: Organization): Observable<any>{
    return this._http.put(this.baseUrl+'editorg/'+data.id, data, this.httpOptions);
  }

  // ================================== organization type ==============================

  createOrgType(data): Observable<any> {
    return this._http.post(this.baseUrl + 'createorgtype', data, this.httpOptions)
  }

  getAllOrganizationTypes(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + 'orgtypelist', this.httpOptions)
  }


  // ==================================== User group ===================================

  getAllUserGroups(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + 'grouplist', this.httpOptions);
  }

  createUserGroup(data): Observable<any> {
    return this._http.post(this.baseUrl + 'creategroup', data, this.httpOptions);
  }


  // ================================ roles ============================================

  getAllRoles(): Observable<Response> {
    return this._http.get<Response>(this.baseUrl + 'listroles?paged=false', this.httpOptions);
  }

  createRole(obj): Observable<any> {
    return this._http.post(this.baseUrl + 'createrole', obj , this.httpOptions);
  }

}
