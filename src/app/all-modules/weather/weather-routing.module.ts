import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherComponent} from "./weather.component";
import {HistoricalDataComponent} from "./historical-data/historical-data.component";
import {WeatherReportsComponent} from "./weather-reports/weather-reports.component";
import {AddWeatherDataComponent} from "./add-weather-data/add-weather-data.component";

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    children: [
      {
        path: 'add-weather-data',
        component: AddWeatherDataComponent
      },
      {
        path: 'historical-data',
        component: HistoricalDataComponent
      },
      {
        path: 'reports',
        component: WeatherReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
