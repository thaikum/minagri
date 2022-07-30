import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Sale} from '../interface/Sale';
import {headers} from '../http/http-headers';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private baseUrl = environment.apiUrl+'products/'

  httpOptions = {
    headers
  }

  constructor(private _http: HttpClient) { }

  // ========================== pure sales =====================================================

  getAllSales(): Observable<Response>{
    return this._http.get<Response>(this.baseUrl+'listsales',this.httpOptions)
  }

  makeSale(sale: Sale): Observable<any>{
    return this._http.post(this.baseUrl+'make-sale', sale,this.httpOptions);
  }

  // ================================= todo shift to product service ===========================
  getAllProducts(): Observable<Response>{
    return this._http.get<Response>(this.baseUrl+'listproducts', this.httpOptions);
  }
}
