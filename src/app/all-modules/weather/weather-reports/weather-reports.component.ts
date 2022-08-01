import { WeatherReports } from './../interface/weather-reports';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../weather.service';

declare const $: any;
@Component({
  selector: 'app-weather-reports',
  templateUrl: './weather-reports.component.html',
  styleUrls: ['./weather-reports.component.css']
})
export class WeatherReportsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public weatherreports: WeatherReports[] = [];

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();

  public innerHeight: any;
  name: any;
  id: any;



  constructor(private http: HttpClient, public ws: WeatherService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');

    this.getReportsData();

     // for data table configuration
     this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $('#datatable').DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.weatherreports = [];
    this.getReportsData();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  public getReportsData() {
    this.ws.getWeatherReports().subscribe(data =>{
      this.weatherreports = data.body;
      console.log(this.weatherreports);
      this.rows = this.weatherreports;
      this.srch = [...this.rows];
    })
  }

  // search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter((d) => {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
