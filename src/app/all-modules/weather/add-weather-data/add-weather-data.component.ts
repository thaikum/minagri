import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AllModulesService } from '../../all-modules.service';
import { AddWeatherData } from '../interface/add-weather-data';
import { WeatherService } from '../weather.service';

declare const $: any;
@Component({
  selector: 'app-add-weather-data',
  templateUrl: './add-weather-data.component.html',
  styleUrls: ['./add-weather-data.component.css']
})
export class AddWeatherDataComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dakarweatherdata: AddWeatherData[] = [];

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

  constructor(private allModuleService: AllModulesService,public ws: WeatherService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    // for floating label
    $('.floating')
      .on('focus blur', function (e) {
        $(this)
          .parents('.form-focus')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
    this.getDakarData();
    
  
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
      this.dakarweatherdata = [];
      this.getDakarData();
      setTimeout(() => {
        this.dtTrigger.next();
      }, 1000);
  }


  public getDakarData() {
    this.ws.getDakadWeather().subscribe(data =>{
      this.dakarweatherdata = data.body;
      console.log(this.dakarweatherdata);
      this.rows = this.dakarweatherdata;
      this.srch = [...this.rows];
    })
  }


   // search by name
   searchName(val) {
    this.rows.splice(0, this.rows.length);
    const temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.district.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
