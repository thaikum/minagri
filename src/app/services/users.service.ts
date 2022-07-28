import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = environment.apiUrl+'user/'
  private baseUrl = environment.apiUrl+'admin/'

  constructor(private _http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    return this._http.get<any>(this.baseUrl+'users');
  }

  registerUser(user: User): Observable<any>{
    return this._http.post(this.userUrl+'register', user);
  }


}
