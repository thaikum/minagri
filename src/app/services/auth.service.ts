import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {loginHeaders} from '../http/http-headers';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'oauth/'

  constructor(private _http: HttpClient) {
  }

   login(username: string, password: string): Observable<any> {


    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    return this._http.post<any>(this.baseUrl + 'token', body, {headers: loginHeaders});
  }
}
