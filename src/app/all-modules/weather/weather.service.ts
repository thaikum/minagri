import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {headers} from "../../http/http-headers";
import {HttpClient} from "@angular/common/http";
import {AddWeatherData} from "./interface/add-weather-data";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = environment.apiUrl+'weather/'

  httpOptions = {
    headers: headers
  }

  constructor(private http: HttpClient) { }

//  Add Weather Data
  addWeatherData(weatheradata: AddWeatherData): Observable<any> {
    return this.http.post(this.baseUrl+'upload', weatheradata, this.httpOptions);
  }
//  Historical Data
  getHistoricalData(): Observable<any> {
    return this.http.get(this.baseUrl+'seasonalforecast', this.httpOptions);
  }
//  Weather Reports
  getWeatherReports(): Observable<any> {
    return this.http.get(this.baseUrl+'', this.httpOptions);
  }
}
