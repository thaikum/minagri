import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FarmerService {


  private baseUrl = environment.apiUrl+'farmers/'
  private headers = new HttpHeaders({
    Authorization: 'Bearer '+sessionStorage.getItem('accessToken')
  })

  constructor(private _http: HttpClient) {
  }

  getAllFarmers(): Observable<any> {
    return this._http.get<any>(this.baseUrl+'listfarmers', {headers});
  }

  createFarmer(obj) {
    return this._http.post(this.baseUrl+'editprofile', obj, {headers})
  }
}
