import { WeatherService } from './../weather.service';
import { Component, OnInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { HistoricalData } from '../interface/historical-data';
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@HostListener('window: resize', ['$event'])
@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public historical: HistoricalData[];

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
    this.getHistoricalData();
    
    // ngAfterViewInit(): void {
    //   setTimeout(() => {
    //     this.dtTrigger.next();
    //   }, 1000);
    // }
  
    // manually rendering Data table
  
  //   rerender(): void {
  //     $('#datatable').DataTable().clear();
  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy();
  //     });
  //     this.historical = [];
  //     this.getHistoricalData();
  //     setTimeout(() => {
  //       this.dtTrigger.next();
  //     }, 1000);
  // }
}


  public getHistoricalData() {
    this.ws.getHistoricalData().subscribe(data =>{
      this.historical = data.body;
      console.log(this.historical);
      this.rows = this.historical;
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


