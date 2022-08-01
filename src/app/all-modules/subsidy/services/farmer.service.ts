import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { headers } from 'src/app/http/http-headers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private baseUrl = environment.apiUrl+'organization/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }

  // list Farmer Category
  getFarmerCategory(): Observable<any> {
    return this.http.get(this.baseUrl+'listfarmercategory', this.httpOptions);
  }
}
