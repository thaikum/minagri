import {Component, OnInit} from '@angular/core';
import {OrganizationService} from "../../../services/organization.service";
import {data} from "jquery";
import {Organization} from "../../../interface/Organization";
import {SalesService} from "../../../services/sales.service";
import {Farmer} from "../../../interface/Farmer";
import {UsersService} from "../../../services/users.service";
import {FarmerService} from "../../../services/farmer.service";
import {User} from "../../../interface/User";
import {Subsidy} from "../../subsidy/interface/subsidy";
import {SubsidyService} from "../../subsidy/services/subsidy.service";
import {Sale} from "../../../interface/Sale";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;

  public products: any = [];
  public organizations: Organization[] = [];
  public farmers: Farmer[] = [];
  public users: User[] = [];
  public subsidies: Subsidy[] = [];
  public sales: Sale[] = [];
  public subsidyTotal = 0;

  public barColors = {
    a: '#ff9b44',
    b: '#fc6075',
  };
  public lineColors = {
    a: '#ff9b44',
    b: '#fc6075',
  };

  constructor(
    private _orgService: OrganizationService,
    private _salesService: SalesService,
    private _userService: UsersService,
    private _farmerService: FarmerService,
    private _subsidyService: SubsidyService,
  ) {
  }

  ngOnInit() {


    this._orgService.getAll().subscribe(dt => {
      this.organizations = dt.body;
    });

    this._salesService.getAllProducts().subscribe(dt => {
      this.products = dt.body;
    });

    this._userService.getAllUsers().subscribe(dt => {
      this.users = dt.body;
    })

    this._farmerService.getAllFarmers().subscribe(dt => {
      this.farmers = dt.body;
    });



    this.chartOptions = {
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Total Rate'],
      barColors: [this.barColors.a],
    };


    this._subsidyService.getAllSubsidies().subscribe(dt =>{
      this.subsidies = dt.body;
      this.subsidyTotal = this.subsidies.map(sub=>sub.rate).reduce((total, sub) => total + sub);

      this.chartData = [
        {y: '2022', a :this.subsidyTotal},
      ];
    })





    this.lineOption = {
      xkey: 'actualpay',
      ykeys: ['productid'],
      labels: ['Total Sales'],
      resize: true,
      lineColors: [this.lineColors.a],
    };

    this._salesService.getAllSales().subscribe(dt=> {
      // @ts-ignore
      this.sales = dt.body;
      this.lineData = this.sales
    })

    // this.lineData = [
    //   {y: '2006', a: 50, b: 90},
    //   {y: '2007', a: 75, b: 65},
    //   {y: '2008', a: 50, b: 40},
    //   {y: '2009', a: 75, b: 65},
    //   {y: '2010', a: 50, b: 40},
    //   {y: '2011', a: 75, b: 65},
    //   {y: '2012', a: 100, b: 50}
    // ];
  }
}
