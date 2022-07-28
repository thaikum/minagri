import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private baseUrl = environment.apiUrl+'farmers/'

  constructor(private _http: HttpClient) {
  }

  getAllFarmers(): Observable<any> {
    return this._http.get<any>(this.baseUrl+'listfarmers');
  }
}
