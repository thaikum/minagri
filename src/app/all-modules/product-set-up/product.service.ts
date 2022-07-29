import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  url = 'http://157.230.190.229:8843'

  // Product Category

  //Get All Product Categories
  getCategory(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

//  Add New Product Category
  addProduct(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }

  // Product Type

  //Get All Product Types
  getproductType(endpoint: string){
    return this.http.get(this.url + endpoint);
  }

//  Add New Product Type
  addproductType(endpoint: string, model: any){
    return this.http.post(this.url + endpoint, model);
  }


}
