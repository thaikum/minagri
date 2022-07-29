import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { AddWeatherDataComponent } from './add-weather-data/add-weather-data.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { WeatherReportsComponent } from './weather-reports/weather-reports.component';


@NgModule({
  declarations: [
    WeatherComponent,
    AddWeatherDataComponent,
    HistoricalDataComponent,
    WeatherReportsComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule { }
