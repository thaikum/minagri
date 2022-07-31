import { WeatherReports } from './../interface/weather-reports';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-reports',
  templateUrl: './weather-reports.component.html',
  styleUrls: ['./weather-reports.component.css']
})
export class WeatherReportsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public weatherreports: WeatherReports[];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();

  public innerHeight: any;
  name: any;
  id: any;


  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }


  constructor(private http: HttpClient, public ws: WeatherService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getReportsData();
  }

  public getReportsData() {
    this.ws.getWeatherReports().subscribe(data =>{
      this.weatherreports = data.body;
      console.log(this.weatherreports);
      this.rows = this.weatherreports;
      this.srch = [...this.rows];
    })
  }

}
