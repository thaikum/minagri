import { ProductLoading } from './interface/product-loading';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {Observable} from "rxjs";
import {Categories} from "./interface/categories";
import {Producttypes} from "./interface/producttypes";
import { ProductType } from './interface/product_type';

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
    return this.http.post(this.baseUrl+'createcategory' ,category, this.httpOptions);
  }

  // Product Type

  //Get All Product Types
  getproductType(): Observable<any>{
    return this.http.get(this.baseUrl+'listproducts', this.httpOptions);
  }

//  Add New Product Type
  addproductType(producttypes: ProductType): Observable<any>{
    return this.http.post(this.baseUrl+'createtype', producttypes, this.httpOptions);
  }

  // list product types

  listProductType(): Observable<any>{
    return this.http.get(this.baseUrl+'listtype', this.httpOptions);
  }

  // Product Loading
  // list Product Loading
  listProductLoading(): Observable<any>{
    return this.http.get(this.baseUrl+'listloadings', this.httpOptions);
  }

  // add product loading
  addproductLoading(productloading: ProductLoading): Observable<any>{
    return this.http.post(this.baseUrl+'addproductloading', productloading, this.httpOptions);
  }


}
