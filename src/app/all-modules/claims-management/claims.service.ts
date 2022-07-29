import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private http: HttpClient) { }
  url = 'http://157.230.190.229:8843'


  //Get All Claims
  getClaims(endpoint: string){
    return this.http.get(this.url + endpoint);
  }
}
