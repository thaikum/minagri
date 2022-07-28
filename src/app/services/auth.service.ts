import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl+'oauth/'

  constructor(private _http: HttpClient) { }

  login(username:string, password:string): boolean{
    let isLoggedIn = false;

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    this._http.post(this.baseUrl+'token/', body).subscribe(dt=>{
      if(!!dt){
        isLoggedIn = true
      }
    })

    return isLoggedIn
  }
}
