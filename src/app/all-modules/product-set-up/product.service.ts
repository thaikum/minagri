import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";
import {Categories} from "./interface/categories";
import {Producttypes} from "./interface/producttypes";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl+'products/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }

  // Product Category

  //Get All Product Categories
  getAllCategory(): Observable<any>{
    return this.http.get(this.baseUrl+'listcategory',this.httpOptions);
  }

//  Add New Product Category
  addProduct(category: Categories): Observable<any>{
    return this.http.post(this.baseUrl+'createtype' ,category, this.httpOptions);
  }

  // Product Type

  //Get All Product Types
  getproductType(): Observable<any>{
    return this.http.get(this.baseUrl+'', this.httpOptions);
  }

//  Add New Product Type
  addproductType(producttypes: Producttypes): Observable<any>{
    return this.http.post(this.baseUrl+'createtype', producttypes, this.httpOptions);
  }


}
